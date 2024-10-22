import makeWASocket, {
  DisconnectReason,
  SignalDataSet,
  SignalDataTypeMap,
} from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";

async function main() {
  const sock = makeWASocket({
    printQRInTerminal: true,
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log(
        "Connection closed due to ",
        lastDisconnect.error,
        ", reconnecting...",
        shouldReconnect
      );
    }
  });
}
