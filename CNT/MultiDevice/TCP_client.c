#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#define PORT 8000

int main() {
    WSADATA wsa;
    SOCKET sock;
    struct sockaddr_in serv_addr;
    char *hello = "Hello from client";
    char buffer[1024] = {0};

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2,2), &wsa) != 0) {
        printf("Failed. Error Code : %d\n", WSAGetLastError());
        return 1;
    }

    // Create socket
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        printf("Could not create socket : %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    // Prepare the sockaddr_in structure
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);
    //serv_addr.sin_addr.s_addr = inet_addr("192.168.95.109");  // Replace with the server's IP address
    serv_addr.sin_addr.s_addr = inet_addr("192.168.0.31");

    // Connect to remote server
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0) {
        printf("Connection failed with error code : %d\n", WSAGetLastError());
        closesocket(sock);
        WSACleanup();
        return 1;
    }

    // Send data to the server
    send(sock, hello, strlen(hello), 0);
    printf("Hello message sent\n");

    // Receive a reply from the server
    recv(sock, buffer, 1024, 0);
    printf("Message from server: %s\n", buffer);

    // Clean up and close socket
    closesocket(sock);
    WSACleanup();

    return 0;
}

// gcc TCP_client.c -o TCP_client -lws2_32
// .\TCP_client