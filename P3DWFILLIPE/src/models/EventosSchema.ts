import mongoose, {Schema} from "mongoose";

const eventoSchema = new Schema ({
    titulo:{type: String, required: true},
    descricao:{type: String},
    data:{type: Date, required: true},
    local:{type: String, required: true},
    valor:{type: Number, required: true}
});

const evento = mongoose.model('Evento', eventoSchema);
export {evento};