from sqlalchemy import engine_from_config
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import configure_mappers
import zope.sqlalchemy

# Import Matakuliah di sini agar terhubung dengan Base.metadata
from .mymodel import Matakuliah  # Perubahan di sini

# Menjalankan configure_mappers setelah mendefinisikan model
configure_mappers()


def get_engine(settings, prefix='sqlalchemy.'):
    return engine_from_config(settings, prefix)


def get_session_factory(engine):
    factory = sessionmaker()
    factory.configure(bind=engine)
    return factory


def get_tm_session(session_factory, transaction_manager):
    """
    Mendapatkan instance sqlalchemy.orm.Session yang didukung oleh transaksi.
    """
    dbsession = session_factory()
    zope.sqlalchemy.register(
        dbsession, transaction_manager=transaction_manager)
    return dbsession


def includeme(config):
    """
    Inisialisasi model untuk aplikasi Pyramid.
    """
    settings = config.get_settings()
    settings['tm.manager_hook'] = 'pyramid_tm.explicit_manager'

    # Menggunakan pyramid_tm untuk siklus hidup transaksi
    config.include('pyramid_tm')

    # Menggunakan pyramid_retry untuk mencoba kembali jika terjadi eksepsi sementara
    config.include('pyramid_retry')

    session_factory = get_session_factory(get_engine(settings))
    config.registry['dbsession_factory'] = session_factory

    # Membuat request.dbsession tersedia untuk digunakan di Pyramid
    config.add_request_method(
        lambda r: get_tm_session(session_factory, r.tm),
        'dbsession',
        reify=True
    )