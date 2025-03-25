from databases import Database
import sqlalchemy

DATABASE_URL = "sqlite:///./xeno.db"  # SQLite database URL

metadata = sqlalchemy.MetaData()

users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("username", sqlalchemy.String(32)),
    sqlalchemy.Column("email", sqlalchemy.String(128)),
    sqlalchemy.Column("full_name", sqlalchemy.String(256), nullable=True),
    sqlalchemy.Column("disabled", sqlalchemy.Boolean, default=False),
)

engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}  # Required for SQLite
)

metadata.create_all(engine)

database = Database(DATABASE_URL)