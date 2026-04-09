from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.subscribers import Subscriber as SubscriberModel
from app.schemas.subscribers import Subscriber, SubscriberCreate

router = APIRouter(prefix="", tags=["subscribers"])

@router.post("/subscribe", response_model=Subscriber)
def subscribe(sub: SubscriberCreate, db: Session = Depends(get_db)):
    db_sub = db.query(SubscriberModel).filter(SubscriberModel.email == sub.email).first()
    if db_sub:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_sub = SubscriberModel(email=sub.email)
    db.add(new_sub)
    db.commit()
    db.refresh(new_sub)
    return new_sub
