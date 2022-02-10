class HelloController {
  async index(req, res) {
    return res.json({ hello: 'Mundo' });
  }
}

export default new HelloController();