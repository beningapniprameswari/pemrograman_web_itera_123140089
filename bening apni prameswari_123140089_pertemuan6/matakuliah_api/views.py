from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import (
    HTTPNotFound, 
    HTTPBadRequest, 
    HTTPConflict
)
from sqlalchemy.exc import IntegrityError
from .models import Matakuliah

# ==========================================
# HELPER: VALIDASI INPUT
# ==========================================
def validate_payload(payload):
    """
    Memastikan data JSON memiliki field wajib:
    kode_mk, nama_mk, sks, dan semester.
    """
    wajib = ['kode_mk', 'nama_mk', 'sks', 'semester']
    # Cek apakah semua field wajib ada
    if not all(field in payload for field in wajib):
        raise HTTPBadRequest(json_body={
            'status': 'error',
            'message': 'Data tidak lengkap. Wajib: kode_mk, nama_mk, sks, semester'
        })

# ==========================================
# VIEWS / ROUTES
# ==========================================

# 0. HOME
@view_config(route_name='home')
def home_view(request):
    return Response('API Matakuliah Ready')

# 1. GET ALL (Ambil Semua Data)
@view_config(route_name='mk_index', renderer='json', request_method='GET')
def index_matakuliah(request):
    query = request.db.query(Matakuliah).all()
    return {'matakuliahs': [item.serialize() for item in query]}

# 2. GET ONE (Ambil Satu Data berdasarkan ID)
@view_config(route_name='mk_view', renderer='json', request_method='GET')
def show_matakuliah(request):
    mk_id = request.matchdict['id']
    target_mk = request.db.query(Matakuliah).filter_by(id=mk_id).first()
    
    if not target_mk:
        raise HTTPNotFound(json_body={
            'status': 'error',
            'message': f'Matakuliah dengan ID {mk_id} tidak ditemukan'
        })
    
    return target_mk.serialize()

# 3. POST (Tambah Data Baru)
@view_config(route_name='mk_add', renderer='json', request_method='POST')
def add_matakuliah(request):
    # 1. Cek format JSON
    try:
        payload = request.json_body
    except:
        raise HTTPBadRequest(json_body={'status': 'error', 'message': 'Format JSON invalid'})

    # 2. Validasi kelengkapan data
    validate_payload(payload)

    # 3. Buat Object Baru
    new_mk = Matakuliah(
        kode_mk=payload['kode_mk'],
        nama_mk=payload['nama_mk'],
        sks=int(payload['sks']),
        semester=int(payload['semester'])
    )

    # 4. Simpan ke Database
    try:
        request.db.add(new_mk)
        request.db.commit()
        request.response.status_code = 201  # Created
        return {
            'status': 'success',
            'message': 'Data berhasil ditambahkan',
            'data': new_mk.serialize()
        }
    except IntegrityError:
        request.db.rollback()
        raise HTTPConflict(json_body={
            'status': 'error', 
            'message': 'Gagal simpan. Kode Matakuliah mungkin sudah ada (Duplikat).'
        })

# 4. PUT (Update Data)
@view_config(route_name='mk_edit', renderer='json', request_method='PUT')
def edit_matakuliah(request):
    mk_id = request.matchdict['id']
    target_mk = request.db.query(Matakuliah).filter_by(id=mk_id).first()

    # Cek apakah data ada
    if not target_mk:
        raise HTTPNotFound(json_body={'status': 'error', 'message': 'Matakuliah tidak ditemukan'})

    try:
        payload = request.json_body
    except:
        raise HTTPBadRequest(json_body={'status': 'error', 'message': 'Body request invalid'})

    # Update data (gunakan data lama jika data baru tidak dikirim)
    target_mk.kode_mk = payload.get('kode_mk', target_mk.kode_mk)
    target_mk.nama_mk = payload.get('nama_mk', target_mk.nama_mk)
    
    # Konversi ke int jika ada update angka
    if 'sks' in payload:
        target_mk.sks = int(payload['sks'])
    if 'semester' in payload:
        target_mk.semester = int(payload['semester'])

    try:
        request.db.commit()
        return {
            'status': 'success',
            'message': 'Data berhasil diupdate',
            'data': target_mk.serialize()
        }
    except IntegrityError:
        request.db.rollback()
        raise HTTPConflict(json_body={
            'status': 'error',
            'message': 'Gagal update. Kode MK mungkin bentrok dengan data lain.'
        })

# 5. DELETE (Hapus Data)
@view_config(route_name='mk_remove', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    target_mk = request.db.query(Matakuliah).filter_by(id=mk_id).first()

    if not target_mk:
        raise HTTPNotFound(json_body={'status': 'error', 'message': 'Matakuliah tidak ditemukan'})

    try:
        request.db.delete(target_mk)
        request.db.commit()
        return {
            'status': 'success', 
            'message': f'Data id {mk_id} berhasil dihapus'
        }
    except Exception as e:
        request.db.rollback()
        raise HTTPBadRequest(json_body={'status': 'error', 'message': str(e)})