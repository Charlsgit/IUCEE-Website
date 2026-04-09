from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    # Set this to a real Neon URL for production, leave as default for local SQLite dev
    neon_database_url: Optional[str] = None
    resend_api_key: str = ""
    secret_admin_key: str = "dev_secret"
    frontend_url: str = "http://localhost:3000"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
