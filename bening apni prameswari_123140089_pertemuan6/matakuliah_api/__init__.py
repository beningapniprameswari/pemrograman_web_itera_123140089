from pyramid.config import Configurator
from sqlalchemy import engine_from_config
from .models import DBSession, Base  # Pastikan import ini sesuai dengan models.py Anda

def main(global_config, **settings):
    # 1. Konfigurasi Database
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    Base.metadata.bind = engine
    
    # (Opsional) Auto-create table jika belum ada (untuk dev)
    Base.metadata.create_all(engine) 

    config = Configurator(settings=settings)

    # 2. Setup request.db agar bisa dipanggil di views
    # Ini membuat 'request.db' tersedia di setiap request
    config.add_request_method(
        lambda r: DBSession(),
        'db',
        reify=True
    )

    # 3. Mendaftarkan Routes (Harus cocok dengan route_name di views.py)
    config.add_route('home', '/')
    config.add_route('mk_index', '/matakuliah')        # GET All & POST
    config.add_route('mk_add', '/matakuliah/add')      # (Opsional jika ingin URL khusus add)
    
    # Route dengan parameter ID
    config.add_route('mk_view', '/matakuliah/{id}')       # GET One
    config.add_route('mk_edit', '/matakuliah/{id}/edit')  # PUT
    config.add_route('mk_remove', '/matakuliah/{id}/delete') # DELETE

    # 4. Scan folder untuk mencari @view_config
    config.scan()

    return config.make_wsgi_app()