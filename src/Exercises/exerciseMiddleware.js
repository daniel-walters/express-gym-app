import { getExerciseById  } from "./exerciseFunctions.js";

export async function getExerciseforDelete(req, res, next){
    let exercise;
    try{
        exercise = await getExerciseById(req.params.id);
        if (exercise == null) return res.status(404).json({ message: "Cannot find exercise" })
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.exercise = exercise;
    next();
}