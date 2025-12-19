def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')
    config.add_route('api_matakuliah', '/api/matakuliah')
    config.add_route('api_matakuliah_id', '/api/matakuliah/{id}')