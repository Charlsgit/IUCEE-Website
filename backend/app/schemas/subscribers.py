from pydantic import BaseModel, EmailStr
from datetime import datetime

class SubscriberBase(BaseModel):
    email: EmailStr

class SubscriberCreate(SubscriberBase):
    pass

class Subscriber(SubscriberBase):
    id: int
    is_active: bool
    timestamp: datetime

    model_config = {"from_attributes": True}
