module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
    },
    { timestamps: true }
  );//creo el esquema para mongo

  //creamos metodo para el esquema
  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  //exortamos el esquema
  const Tutorial = mongoose.model("tutorial", schema);
  return Tutorial;
};
