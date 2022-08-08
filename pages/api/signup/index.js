import { dbConnect } from "../../../lib/db-connect";
import User from "../../../src/models/user";
import {
  errorHandler,
  responseHandler,
  validateAll,
} from "../../../src/utils/common";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    errorHandler("Invalid request", res);
    return;
  }

  try {
    const { name, email, password } = req.body;
    validateAll({ name, email, password });

    // create db connection
    await dbConnect();

    const user = new User({ name, email, password });
    const savedUser = await user.save();

    if (savedUser) {
      responseHandler(savedUser, res, 201);
    } else {
      errorHandler("something went wrong", res);
    }
  } catch (error) {
    errorHandler(error, res);
  } finally {
    res.end();
  }
}
