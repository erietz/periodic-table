import mongoose from "mongoose";
import util from "util";

const db = mongoose.connection;
// connection string on port 27017 using database named periodicTable
const connectionURL = "mongodb://localhost:27017/periodicTable";

// connect to the db
mongoose.connect(connectionURL);

// adds a one timed listener event for the event named "foo"
db.once("foo", () => {
    console.log(`Connected to MongoDb using mongoose at ${connectionURL}`);
});

export interface Table {
    name: string,
    date: Date,
    data: {
        [key: string]: {
            [key: string]: string
        }
    }[]
};

const TableSchema = new mongoose.Schema<Table>(
    {
        name: { type: String, required: true },
        date: { type: Date, required: true },
        data: [
            {
                type: Map,
                of: {
                    type: String
                },
                validate: (map: Map<string, string>) => {
                    const requiredValues: string[] = [];
                    const regex = /col\d+/;

                    for (const [key, value] of map.entries()) {
                        if (regex.test(key) == false) {
                            throw new Error(`Key must be of the form ${regex}`);
                        }
                        requiredValues.push(value);
                    }

                    for (const obj of requiredValues) {
                        for (const key of ["AtomicNumber", "GroupBlock"]) {
                            if (Object.keys(obj).length > 0 && !(obj.hasOwnProperty(key))) {
                                throw new Error(`Required key: ${key} is missing from ${util.inspect(obj)}`);
                            }
                        }
                    }
                }
            }
        ]
    },
    { minimize: false }
);

const TableModel = mongoose.model<Table>("PeriodicTable", TableSchema);

export async function saveTable(data: Table): Promise<mongoose.Document> {
    return new TableModel(data).save();
}

export async function getTables(
    filter: object,
    projection: string,
    limit: number
): Promise<Table[]> {
    const query = TableModel.find(filter, projection)
        .select(projection)
        .limit(limit);
    return query.exec();
}

