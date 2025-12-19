from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPFound 
from pyramid.view import view_config
from sqlalchemy.exc import DBAPIError
from ..models import Matakuliah

# Mendapatkan semua matakuliah
@view_config(route_name='api_matakuliah', renderer='json', request_method='GET')
def get_all_matakuliah(request):
    try:
        query = request.dbsession.query(Matakuliah).all()
        return {'matakuliahs': [mk.to_dict() for mk in query]}
    except DBAPIError:
        return Response("Database error", content_type='text/plain', status=500)

# Menambahkan matakuliah baru
@view_config(route_name='api_matakuliah', renderer='json', request_method='POST')
def create_matakuliah(request):
    data = request.json_body
    new_mk = Matakuliah(
        kode_mk=data['kode_mk'],
        nama_mk=data['nama_mk'],
        sks=data['sks'],
        semester=data['semester']
    )
    request.dbsession.add(new_mk)
    return {'status': 'success', 'data': new_mk.to_dict()}

# Mendapatkan detail satu matakuliah
@view_config(route_name='api_matakuliah_id', renderer='json', request_method='GET')
def get_one_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    if mk:
        return mk.to_dict()
    return Response(json_body={'error': 'Data tidak ditemukan'}, status=404)

# Mengupdate data matakuliah
@view_config(route_name='api_matakuliah_id', renderer='json', request_method='PUT')
def update_matakuliah(request):
    mk_id = request.matchdict['id']
    data = request.json_body
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if mk:
        mk.kode_mk = data.get('kode_mk', mk.kode_mk)
        mk.nama_mk = data.get('nama_mk', mk.nama_mk)
        mk.sks = data.get('sks', mk.sks)
        mk.semester = data.get('semester', mk.semester)
        return {'status': 'updated', 'data': mk.to_dict()}
    return Response(json_body={'error': 'Data gagal diupdate'}, status=404)

# Menghapus data matakuliah
@view_config(route_name='api_matakuliah_id', renderer='json', request_method='DELETE')
def delete_matakuliah(request):
    mk_id = request.matchdict['id']
    mk = request.dbsession.query(Matakuliah).filter_by(id=mk_id).first()
    
    if mk:
        request.dbsession.delete(mk)
        return {'status': 'deleted', 'message': f'Matakuliah ID {mk_id} berhasil dihapus'}
    return Response(json_body={'error': 'Data tidak ditemukan'}, status=404)

@view_config(route_name='home')
def my_view(request):
    # Mengarahkan ke folder static yang berisi index.html
    return HTTPFound(location=request.static_url('pyramid_mahasiswa:static/index.html'))