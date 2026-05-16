from fastapi import APIRouter, Request
from sqlalchemy import select

from backend.api.dependencies import SessionDep
from backend.core import CORE
from backend.mappers.quest_mapper import QuestMapper
from backend.models.quest import QuestModel
from backend.models.user import StatusEnum
from backend.secret_model import user_request_validity

router = APIRouter(prefix='/quests', tags=['quests'])



@router.get('/active')
async def active(request: Request, session: SessionDep):
    """
    Активные квесты пользователя.

    :param request:
    :param session:
    :return:
    """

    user = await user_request_validity(request, StatusEnum.all, session)

    progressing = [b == "1" for b in bin(user.quests)[2:]]
    progressing = [False] * (CORE.count_quests - len(progressing)) + progressing

    percent_by_quests = 100 / CORE.count_quests
    quests_stadi = int(user.adaptationProgress / (percent_by_quests * 5))

    query = (
        select(QuestModel)
        .filter(QuestModel.stadi == quests_stadi)
    )

    result = await session.execute(query)
    quests = []
    for quest in result.scalars().all():
        quests.append(QuestMapper.to_schem(quest, progressing[-quest.id]))

    return quests

@router.get('/complit/{id_quest}')
async def complit(id_quest:int , request: Request, session: SessionDep):
    user = await user_request_validity(request, StatusEnum.all, session)

    quests = bin(user.quests)[2:]
    percent_by_quests = 100 / CORE.count_quests
    quests_stadi = int(user.adaptationProgress / (percent_by_quests * 5))
    quests = "0" * (CORE.count_quests - len(quests)) + quests

    query = (
        select(QuestModel)
        .filter(QuestModel.id == id_quest)
    )

    result = await session.execute(query)
    quest = result.scalars().one()
    if quests[-id_quest] == "0" and quest.stadi == quests_stadi:
        user.quests += 2 ** (id_quest - 1)
        user.adaptationProgress += percent_by_quests
        user.xp += quest.xp
        await session.commit()
        return True
    return False
