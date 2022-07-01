const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try {
    const {title, description, published} = req.body;
    // if(!title || !description){
    //     res.status(400).send({message:"Content cannot be empty"});
    //     return;
    // }

    const tutorial = {
      title: title,
      description: description,
      published: published ? published : false,
    };
    const data = await Tutorial.create(tutorial);
    res.status(200).send({message:"Tutorial created!",data:data});
  } catch (error) {
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = async(req, res) => {
try {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    const data = await Tutorial.findAll({ where: condition });
    res
      .status(200)
      .send({ message: "Data retrieved successfully",data: data });
} catch (error) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tutorials.",
    });
}
};
  
// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
try {
const id = req.params.id;
const data = await Tutorial.findByPk(id);
if (data) {
res.status(200).send({ data: data, message: "Data found successfully" });
} else {
res.status(404).send({
    message: `Cannot find Tutorial with id=${id}.`,
});
}
} catch (error) {
res.status(500).send({
    message: "Error retrieving Tutorial with id",
});
}
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
const id = req.params.id;

Tutorial.update(req.body, {
    where: { id: id }
})
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Tutorial was updated successfully."
        });
    } else {
        res.send({
        message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Error updating Tutorial with id=" + id
    });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
const id = req.params.id;

Tutorial.destroy({
    where: { id: id }
})
    .then(num => {
    if (num == 1) {
        res.send({
        message: "Tutorial was deleted successfully!"
        });
    } else {
        res.send({
        message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
    }
    })
    .catch(err => {
    res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
    });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
Tutorial.destroy({
    where: {},
    truncate: false
})
    .then(nums => {
    res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while removing all tutorials."
    });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
Tutorial.findAll({ where: { published: true } })
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving tutorials."
    });
    });
};