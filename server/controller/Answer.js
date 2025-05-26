// controller/Answer.js
import mongoose from "mongoose";
import Question from "../models/Question.js";

export const postanswer = async (req, res) => {
  const { id: _id } = req.params;
  const { noofanswers, answerbody, useranswered, userid } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  try {
    const question = await Question.findById(_id);
    const updatedQuestion = await Question.findByIdAndUpdate(
      _id,
      {
        $addToSet: { answer: [{ answerbody, useranswered, userid }] },
      },
      { new: true }
    );

    // Add notification if the answerer is not the question owner
    if (question.userid !== userid) {
      updatedQuestion.notifications.push({
        type: "answer",
        userId: userid,
        message: `User ${useranswered} answered your question: ${question.questiontitle}`,
        createdAt: new Date(),
        read: false,
      });
      await updatedQuestion.save();
    }

    updatenoofquestion(_id, noofanswers);
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(404).json({ message: "error in uploading" });
  }
};

const updatenoofquestion = async (_id, noofanswers) => {
  try {
    await Question.findByIdAndUpdate(_id, {
      $set: { noofanswers: noofanswers },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteanswer = async (req, res) => {
  const { id: _id } = req.params;
  const { answerid, noofanswers } = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("question unavailable...");
  }
  if (!mongoose.Types.ObjectId.isValid(answerid)) {
    return res.status(404).send("answer unavailable...");
  }
  try {
    await Question.updateOne(
      { _id },
      { $pull: { answer: { _id: answerid } } }
    );
    updatenoofquestion(_id, noofanswers);
    res.status(200).json({ message: "successfully deleted.." });
  } catch (error) {
    res.status(404).json({ message: "error in deleting.." });
  }
};