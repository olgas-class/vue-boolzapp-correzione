const { createApp } = Vue;
const dt = luxon.DateTime;

createApp({
  data() {
    return {
      activeContact: 0,
      newMessage: "",
      searchKey: "",
      activeMessage: {
        messageIndex: null,
        visible: null,
      },
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
  computed: {
    currentContact() {
      return this.contacts[this.activeContact];
    },
  },
  methods: {
    changeContact(index) {
      this.activeContact = index;
      this.resetMessageMenu();
    },
    addMessage() {
      // this.activeContactBot = this.activeContact;
      const activeContactBot = this.activeContact;
      // SE il messaggio non è stringa vuota
      if (this.newMessage !== "") {
        // Accedere ai messaggi del contatto corrente
        const messagesArray = this.contacts[activeContactBot].messages;
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
      // Per ogni contatto
      //  controllare se il nome del contatto contiene la chiave di ricerca, allora mettere visible a true
      // altrimenti mettere visible a false
      this.contacts.forEach((contact) => {
        // if (contact.name.toLowerCase().includes(this.searchKey.toLowerCase())) {
        //   contact.visible = true;
        // } else {
        //   contact.visible = false;
        // }
        contact.visible = contact.name
          .toLowerCase()
          .includes(this.searchKey.toLowerCase()); // ---> true / false
      });
    },
    toggleMessageMenu(index) {
      // Se clicco su un messaggio, il menu viene visualizzato
      // Se clicco di nuovo sullo stesso messaggio si nasconde
      // altrimenti se clicco su un'altro messaggio
      // Si nasconde dal messaggio presende e si visualizza nel messaggio cliccato
      if (index === this.activeMessage.messageIndex) {
        // caso click sullo stesso messaggio
        this.activeMessage.visible = !this.activeMessage.visible;
      } else {
        //  clicco su un messaggio diverso
        this.activeMessage.messageIndex = index;
        this.activeMessage.visible = true;
      }
    },
    resetMessageMenu() {
      this.activeMessage.messageIndex = null;
      this.activeMessage.visible = null;
    },
    deleteMessage(index) {
      const selectedContact = this.contacts[this.activeContact];
      selectedContact.messages.splice(index, 1);
      this.resetMessageMenu();
    },
    getLastMessage(contactIndex) {
      const contactMessages = this.contacts[contactIndex].messages;
      return contactMessages.length === 0
        ? { message: "nessun messaggio", date: "" }
        : contactMessages[contactMessages.length - 1];
    },
  },
}).mount("#app");
