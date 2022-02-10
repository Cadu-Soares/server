import User from "../models/User";

import {createPasswordHash} from "../services/auth";

class UserController {
//  Bloco referente a rota de exibição da lista de usuários
  async index(req, res) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch(err) {
      console.error(err);
      return res.status(500).json({error: "Internal server error."})
    }
  }
// Bloco referente a rota de busca de um usuário por seu id
  async show(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      
      if(!user) {
        return res.status(404).json();
      }

      return res.json(user);

    }catch (err) {
      console.error(err);
      return res.status(500).json({error:"Internal server error."})

    } 
  }
// Bloco referente a rota de criação de novo usuário
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        return res.status(422).json({ message: `User ${email} already exists.` });
      }

        //criptografia do password de usuário usando o bcryptjs
        // const encryptedPassword = await createPasswordHash(password);

        // const newUser =  await User.create({ 
        //   email, 
        //   password: encryptedPassword 
        // });

      const newUser =  await User.create({ 
        email, 
        password
      });

      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error:"Internal server error."})
    }
    
  }
//  Bloco referente a rota de update de usuários
    async update(req, res) {
      try {
        const { id } = req.params;
        const { email, password } = req.body;

        const user = await User.findById(id);

        if (!user) {
          return res.status(404).json();
        }
          // Implementar a criptografia de senha aqui também.
         // const encryptedPassword = await createPasswordHash(password);
        //  await user.updateOne({email, password:encryptedPassword})

         await user.updateOne({ email, password});

         return res.status(200).json();
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error:"Internal server error."})
      }
    }
  // Bloco referente a rota de exclusão de usuários
    async destroy(req, res) {
      try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if(!user) {
          return res.status(404).json();
        } 
      await user.deleteOne();
      return res.status(200).json();

      } catch (err) {
        console.error(err);
        return res.status(500).json({ error:"Internal server error."})
      }
    }
}

export default new UserController();