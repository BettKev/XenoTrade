from databases import Database
import sqlalchemy

DATABASE_URL = "sqlite:///./xeno.db"  # SQLite database URL

metadata = sqlalchemy.MetaData()

users = sqlalchemy.Table(
    "users",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("email", sqlalchemy.String(128)),
    sqlalchemy.Column("full_name", sqlalchemy.String(256), nullable=True),
    sqlalchemy.Column("password", sqlalchemy.String(256)),  # Add password column
)

# Stock table
stocks = sqlalchemy.Table(
    "stocks",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("symbol", sqlalchemy.String(10), unique=True, nullable=False),
    sqlalchemy.Column("name", sqlalchemy.String(256), nullable=False),
    sqlalchemy.Column("price", sqlalchemy.Float, nullable=False),
    sqlalchemy.Column("market_id", sqlalchemy.Integer, sqlalchemy.ForeignKey("markets.id"))
)

# Market table
markets = sqlalchemy.Table(
    "markets",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String(256), unique=True, nullable=False)
)

engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}  # Required for SQLite
)

metadata.create_all(engine)

database = Database(DATABASE_URL)
