const Customer = require("../../database/models/Customer");

exports.deleteAllCustomers = async (req, res) => {
  try {
    await Customer.destroy({ truncate: true });
    res.json({ message: "All customers have been deleted." });
  } catch (error) {
    console.error("Error deleting customers:", error);
    res.status(500).json({ message: "Failed to delete customers." });
  }
};

exports.getAllCustomers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not specified
  const offset = (page - 1) * limit;

  try {
    const { count, rows } = await Customer.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    res.json({
      total: count,
      page: page,
      limit: limit,
      customers: rows,
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ message: "Failed to fetch customers." });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Customer not found." });
    } else {
      res.json(customer);
    }
  } catch (error) {
    console.error("Error fetching customer:", error); // Add detailed logging
    res.status(500).json({ message: "Failed to fetch customer." });
  }
};

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.json(customer);
  } catch (error) {
    console.error("Error creating customer:", error); // Add detailed logging
    res.status(500).json({ message: "Failed to create customer." });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const [updatedRowsCount] = await Customer.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedRowsCount === 0) {
      res.status(404).json({ message: "Customer not found." });
    } else {
      const customer = await Customer.findByPk(req.params.id);
      res.json(customer);
    }
  } catch (error) {
    console.error("Error updating customer:", error); // Add detailed logging
    res.status(500).json({ message: "Failed to update customer." });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deletedRowsCount = await Customer.destroy({
      where: { id: req.params.id },
    });
    if (deletedRowsCount === 0) {
      res.status(404).json({ message: "Customer not found." });
    } else {
      res.json({ message: "Customer deleted successfully." });
    }
  } catch (error) {
    console.error("Error deleting customer:", error); // Add detailed logging
    res.status(500).json({ message: "Failed to delete customer." });
  }
};

const names = [
  "Abdulaziz",
  "Ahmad",
  "Abdullah",
  "Ali",
  "Fahad",
  "Saad",
  "Omar",
  "Dhari",
  "Sara",
  "Fatima",
  "Maha",
  "Ghadeer",
  "Hala",
  "Aya",
  "Reem",
  "Rahaf",
  "Saoud",
  "Kouther",
  "Dawood",
  "Bushra",
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateCustomerNumber() {
  return "9" + Math.floor(10000000 + Math.random() * 9000000).toString();
}

exports.seedCustomers = async (req, res) => {
  try {
    const customers = [];
    for (let i = 0; i < 50; i++) {
      const name = getRandomElement(names);
      const gender =
        name === "Sara" ||
        name === "Fatima" ||
        name === "Maha" ||
        name === "Ghadeer" ||
        name === "Hala" ||
        name === "Aya" ||
        name === "Reem" ||
        name === "Rahaf" ||
        name === "Bushra" ||
        name === "Kouther"
          ? "female"
          : "male";
      const customer = {
        number: generateCustomerNumber(),
        name,
        dateOfBirth: getRandomDate(
          new Date(1970, 0, 1),
          new Date(2000, 11, 31)
        ),
        gender,
      };
      customers.push(customer);
    }
    await Customer.bulkCreate(customers);
    res.status(201).json({ message: "50 customers have been added." });
  } catch (error) {
    console.error("Error seeding customers:", error);
    res.status(500).json({ message: "Failed to seed customers." });
  }
};
