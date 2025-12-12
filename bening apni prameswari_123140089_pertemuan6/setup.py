from setuptools import setup, find_packages

requires = [
    'pyramid',
    'SQLAlchemy',
    'psycopg2-binary',
    'alembic',
    'waitress',
]

setup(
    name='matakuliah_api',
    version='0.1',
    packages=find_packages(),
    install_requires=requires,
    entry_points={
        'paste.app_factory': [
    
            'main = matakuliah_api:main',
        ],
    },
)
