from sqlalchemy import Column, Integer, Text
from sqlalchemy.orm import declarative_base, sessionmaker, scoped_session

# Setup dasar
Base = declarative_base()
DBSession = scoped_session(sessionmaker())

def get_db_session(request):
    return DBSession

class Matakuliah(Base):
    __tablename__ = 'matakuliah'
    
    # Definisi kolom
    id = Column(Integer, primary_key=True, autoincrement=True)
    kode_mk = Column(Text, unique=True, nullable=False)
    nama_mk = Column(Text, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    # Kita ubah nama fungsinya biar beda dari temanmu
    def serialize(self):
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester
        }