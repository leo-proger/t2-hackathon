from typing import Annotated

from fastapi import Depends
from sqlalchemy import ForeignKey
# from sqlalchemy.pool import NullPool
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase, mapped_column

engine = create_async_engine(
    'sqlite+aiosqlite:///lessons.db',
    # pool_pre_ping=True,
    # poolclass=NullPool
)
# engine = create_async_engine('sqlite+aiosqlite:///groups.db')

new_session = async_sessionmaker(
    # autocommit=False,
    # autoflush=False,
    # class_=AsyncSession,
    bind=engine,
    expire_on_commit=False
)


async def get_session():
    async with new_session() as session:
        yield session


class Base(DeclarativeBase):
    repr_cols_num = 4
    repr_cols = tuple()

    def __repr__(self):
        cols = []
        for idx, col in enumerate(self.__table__.columns.keys()):
            if col in self.repr_cols or idx < self.repr_cols_num:
                cols.append(f"{col} = {getattr(self, col)}")

        return f"{self.__class__.__name__}({', '.join(cols)})"
    pass


SessionDep = Annotated[AsyncSession, Depends(get_session)]
intpk = Annotated[int, mapped_column(primary_key=True)]
# group_id = Annotated[int, mapped_column(ForeignKey('groups.groupID'))]
