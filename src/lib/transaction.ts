import { ClientSession, Connection } from "mongoose";

export const transaction = async <T>(connection: Connection, cb: (session: ClientSession) => Promise<T>): Promise<T> => {

    const session = await connection.startSession();

    try {
        session.startTransaction();
        const result = await cb(session);
        await session.commitTransaction();
        return result;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }
}