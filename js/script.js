const { createApp } = Vue;
const dt = luxon.DateTime;

createApp({
  data() {
    return {
      activeContact: 0,
      newMessage: "",
      contacts: [
        {
          name: "Michele",
          avatar: "_1",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Hai portato a spasso il cane?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Ricordati di dargli da mangiare",
              status: "sent",
            },
            {
              date: "10/01/2020 16:15:22",
              message: "Tutto fatto!",
              status: "received",
            },
          ],
        },
        {
          name: "Fabio",
          avatar: "_2",
          visible: true,
          messages: [
            {
              date: "20/03/2020 16:30:00",
              message: "Ciao come stai?",
              status: "sent",
            },
            {
              date: "20/03/2020 16:30:55",
              message: "Bene grazie! Stasera ci vediamo?",
              status: "received",
            },
            {
              date: "20/03/2020 16:35:00",
              message: "Mi piacerebbe ma devo andare a fare la spesa.",
              status: "received",
            },
          ],
        },
        {
          name: "Samuele",
          avatar: "_3",
          visible: true,
          messages: [
            {
              date: "28/03/2020 10:10:40",
              message: "La Marianna va in campagna",
              status: "received",
            },
            {
              date: "28/03/2020 10:20:10",
              message: "Sicuro di non aver sbagliato chat?",
              status: "sent",
            },
            {
              date: "28/03/2020 16:15:22",
              message: "Ah scusa!",
              status: "received",
            },
          ],
        },
        {
          name: "Luisa",
          avatar: "_4",
          visible: true,
          messages: [
            {
              date: "10/01/2020 15:30:55",
              message: "Lo sai che ha aperto una nuova pizzeria?",
              status: "sent",
            },
            {
              date: "10/01/2020 15:50:00",
              message: "Si, ma preferirei andare al cinema",
              status: "received",
            },
          ],
        },
      ],
    };
  },
  created() {
    // const now = dt
    //   .now()
    //   .setLocale("it")
    //   .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
    // console.log(now);
  },
  methods: {
    changeContact(index) {
      this.activeContact = index;
    },
    addMessage() {
      // this.activeContactBot = this.activeContact;
      const activeContactBot = this.activeContact;
      // SE il messaggio non è stringa vuota
      if (this.newMessage !== "") {
        // Accedere ai messaggi del contatto corrente
        const messagesArray = this.contacts[this.activeContact].messages;
        // Creare un nuovo oggetto messaggio
        const newMessageObj = {
          date: this.generateDateTime(),
          message: this.newMessage,
          status: "sent",
        };
        // Pushare questo oggetto nell'array di messaggi
        messagesArray.push(newMessageObj);
        // Svuotare l'input
        this.newMessage = "";

        // Set del timer per la risposta
        // setTimeout(this.recieveResponse, 1000);
        setTimeout(() => {
          console.log(this.activeContact, activeContactBot);
          const newMessageObj = {
            date: this.generateDateTime(),
            message: "ok",
            status: "received",
          };
          this.contacts[activeContactBot].messages.push(newMessageObj);
        }, 1000);
      }
    },
    // Metodo separato per messaggio ricevuto
    // recieveResponse() {
    //   // Creare un nuovo messaggio
    //   const newMessageObj = {
    //     date: this.generateDateTime(),
    //     message: "ok",
    //     status: "received",
    //   };
    //   // Accedere ai messaggi del contatto corrente
    //   // pushare il messaggio nell'array
    //   this.contacts[this.activeContactBot].messages.push(newMessageObj);
    // },
    generateDateTime() {
      return dt
        .now()
        .setLocale("it")
        .toLocaleString(dt.DATETIME_SHORT_WITH_SECONDS);
    },
    filterContacts() {
      console.log('filtra');
    }
  },
}).mount("#app");
