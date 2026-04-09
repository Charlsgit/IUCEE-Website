from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from app.config import settings

# Use Neon PostgreSQL in production; fall back to local SQLite for development
if settings.neon_database_url:
    DATABASE_URL = settings.neon_database_url
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,
        pool_size=5,
        max_overflow=10,
    )
else:
    # Local SQLite — no server needed, file created automatically
    DATABASE_URL = "sqlite:///./local_dev.db"
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
    )

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
