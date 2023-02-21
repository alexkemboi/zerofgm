const router = require("express").Router();
const UssdMenu = require("ussd-builder");
let menu = new UssdMenu();

let data = {};

const credentials = {
  apiKey: "0488aa0bdcd9828e516f1a30811ba9dbda37236b878e3a2050f0b2201476956c",
  username: "sandbox",
};

const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

// menu.goStart()

const ussd = () => {
  // query the database to ussd dial number if is present

  let user = "";
  menu.startState({
    next: {
      "": () => {
        if (user) {
          return "userMenu";
        } else {
          return "register";
        }
      },
    },
  });

  menu.state("userMenu", {
    run: () => {
      menu.con(
        "Welcome: " +
          "\n1. Report fgm case" +
          "\n2. Get information" +
          "\n3. Exit"
      );
    },
    next: {
      1: "appointment",
      2: "information",
      3: "quit",
    },
  });

  menu.on("error", (err) => {
    console.log("Error", err);
  });

  menu.state("register", {
    run: () => {
      menu.con("What is your name?");
    },
    next: {
      "*[a-zA-Z]+": "register.age",
    },
  });

  menu.state("register.age", {
    run: () => {
      menu.con("What is your age");
    },
    next: {
      "*\\d+": "register.NHIF",
    },
  });

  menu.state("register.NHIF", {
    run: () => {
      menu.con("What is your NHIF");
    },
    next: {
      "*\\d+": "register.complete",
    },
  });

  menu.state("register.complete", {
    run: () => {
      menu.con(
        "Registration done successful." + "\n1. Go to Main Menu" + "\n2. exit"
      );
    },
    next: {
      1: "userMenu",
      2: "quit",
    },
  });

  menu.state("appointment", {
    run: async () => {
      menu.con(
        "Book appointment" + "\n1. Emergency" + "\n2. Normal Appointment"
      );
    },
    next: {
      1: "appointment.emergence",
      2: "appointment.normal",
    },
  });

  menu.state("appointment.normal", {
    run: () => {
      menu.con(
        "Availabe hospital" +
          "\n1. mtrh hospital (Feb 17, 2023)" +
          "\n2. mediheal hospital(Feb 18, 2023)"
      );
    },
    next: {
      "*\\d+": "appointment.normal.complete",
    },
  });

  menu.state("appointment.normal.complete", {
    run: async () => {
      const options = {
        to: menu.args.phoneNumber,
        message: `Greetings your appointment is to mtrh hospital is on Feb 17, 2023`,
      };

      await sms
        .send(options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      menu.end("Succesful booked an appointment");
    },
  });

  menu.state("appointment.emergence", {
    run: () => {
      menu.con(
        "Availabe hospital" + "\n1. mtrh hospital" + "\n2. mediheal hospital"
      );
    },
    next: {
      "*\\d+": "appointment.emergence.complete",
    },
  });

  menu.state("appointment.emergence.complete", {
    run: async () => {
      const options = {
        to: menu.args.phoneNumber,
        message: `Greetings you will be contacted zerofgm hospital`,
      };

      await sms
        .send(options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      menu.end("We will contact you For assistance");
    },
  });

  menu.state("history", {
    run: async () => {
      const options = {
        to: menu.args.phoneNumber,
        message:
          "Date: Feb 1, 2023, \n Location: pokot, \n Hospital:West Pokot referral hospital ",
      };

      await sms
        .send(options)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      menu.end("You will shortly receive history on sms");
    },

    next: {},
  });

  menu.state("quit", {
    run: () => {
      menu.end("Goodbye, Thank you for your time");
    },
  });
};

router.post("/", async (req, res) => {
  await ussd();
  menu.run(req.body, (ussdResult) => {
    res.send(ussdResult);
  });
});

module.exports = router;
