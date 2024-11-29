import { Request, Response } from "express";
import { evento as Evento } from "../models/EventosSchema";

class EventoController{
    async create(req: Request, res: Response): Promise<any>{
        try{
            const {titulo, descricao = "", data, local, valor} = req.body;

            if(!titulo || !data || !local || !valor){
                return res.status(400).json({message: "Os campos titulo, data, local  e valor são obrigatórios"});
            }
            const novoEvento = new Evento({titulo, descricao, data, local, valor});
            const savedEvento = novoEvento.save();
            res.status(201).json(novoEvento);
        } catch (error){
            console.error("Erro ao criar evento", error);
            res.status(500).json({message: "Erro ao criar animal"});
        }
    };
    async find(req: Request, res: Response): Promise<any>{
        try{
            const eventos = await Evento.find();
            res.json(eventos);
        } catch (error){
            console.error("Erro ao buscar eventos", error);
            res.status(500).json({message: "Erro ao buscar eventos"});
        }
    };
    async findById(req: Request, res: Response): Promise<any>{
        try{
            const {id} = req.params;
            const evento = await Evento.findById(id);

            if(!evento){
                res.status(404).json({message: "Evento não encontrado"});
                return;
            }
            res.json(evento);
        } catch (error){
            console.error("Erro ao buscar Evento por id", error);
            res.status(500).json({message: "Erro ao buscar evento por id"});
        }
    };
    async update(req: Request, res: Response): Promise<any>{
        try{
            const {id} = req.params;
            const updatedEvento = await Evento.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            if(!updatedEvento){
                res.status(404).json({message: "Evento não encontrado"});
                return;
            }
            res.json(updatedEvento);
        } catch (error){
            console.error("Erro ao atualizar evento", error);
            res.status(500).json({message: "Erro ao atualizar evento"});
        }
    };
    async delete(req: Request, res: Response): Promise<any>{
        try{
            const {id} = req.params;
            const deletedEvento = await Evento.findByIdAndDelete(id);

            if(!deletedEvento){
                res.status(404).json({message: "Evento não encontrado"});
                return;
            }
            res.json({message: "Evento excluido com sucesso!"});
        } catch (error){
            console.error("Erro ao excluir evento", error);
            res.status(500).json({message: "Erro ao excluir evento"});
        }
    };
};

export default new EventoController();