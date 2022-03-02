#include <Arduino.h>
#include <WiFi.h>
#include <SocketIoClient.h>
#include <string.h>

#define ledPin 2

// Put all of your port here.
//const char *ssid = "ngoduybay";
//const char *password = "12061963";
const char *ssid = "SUNHOUSENM";
const char *password = "Shg@2021";

const char *socketServer = "esp8266-socket-io.herokuapp.com";
const int socketPort = 80;

SocketIoClient socket;

void on_led(const char *payload, size_t length)
{
  digitalWrite(ledPin, HIGH);
  Serial.printf("led on \n");
  socket.emit("esp-send-data","\"led on\"");
  }

 void off_led(const char *payload, size_t length)
{
  digitalWrite(ledPin, LOW);
  Serial.printf("led off \n");
  socket.emit("esp-send-data","\"led off\"");
  }
  
void setup()
{
  Serial.begin(115200);
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);

  Serial.setDebugOutput(true);

  Serial.println();
  Serial.println();
  Serial.println();

  for (uint8_t t = 4; t > 0; t--)
  {
    Serial.printf("[SETUP] BOOT WAIT %d...\n", t);
    Serial.flush();
    delay(1000);
  }

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(100);
    Serial.print(".");
  }
  
  socket.begin(socketServer, socketPort);
  socket.on("on led", on_led);
  socket.on("off led", off_led);
}

void loop()
{
  socket.loop();
}
