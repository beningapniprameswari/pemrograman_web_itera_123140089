from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from matakuliah_api.models import Base, Matakuliah

DATABASE_URL = "postgresql+psycopg2://postgres:123140030@localhost:5432/paw_matakuliah"


def seed_data():
    engine = create_engine(DATABASE_URL)
    Session = sessionmaker(bind=engine)
    session = Session()

    print("Menambahkan data awal matakuliah...")

    data_awal = [
        Matakuliah(kode_mk="IF101", nama_mk="Pengantar Informatika", sks=2, semester=1),
        Matakuliah(kode_mk="IF201", nama_mk="Struktur Data", sks=3, semester=3),
        Matakuliah(kode_mk="IF301", nama_mk="Basis Data", sks=3, semester=3),
        Matakuliah(kode_mk="IF205", nama_mk="Sistem Informasi", sks=2, semester=5),
    ]

    try:
        session.add_all(data_awal)
        session.commit()
        print("Seeder berhasil! Data awal sudah ditambahkan.")
    except Exception as e:
        session.rollback()
        print("Seeder gagal:", e)
    finally:
        session.close()


if __name__ == "__main__":
    seed_data()
