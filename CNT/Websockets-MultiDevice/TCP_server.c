#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#define PORT 8000

int main() {
    WSADATA wsa;
    SOCKET server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[1024] = {0};
    char *hello = "Hello from server";

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2,2), &wsa) != 0) {
        printf("Failed. Error Code : %d\n", WSAGetLastError());
        return 1;
    }

    // Creating socket file descriptor
    if ((server_fd = socket(AF_INET, SOCK_STREAM, 0)) == INVALID_SOCKET) {
        printf("Could not create socket : %d\n", WSAGetLastError());
        return 1;
    }

    // Prepare the sockaddr_in structure
    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    // Bind the socket
    if (bind(server_fd, (struct sockaddr *)&address, sizeof(address)) == SOCKET_ERROR) {
        printf("Bind failed with error code : %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    // Listen for incoming connections
    if (listen(server_fd, 3) == SOCKET_ERROR) {
        printf("Listen failed with error code : %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    printf("Waiting for connections...\n");

    // Accept an incoming connection
    if ((new_socket = accept(server_fd, (struct sockaddr *)&address, &addrlen)) == INVALID_SOCKET) {
        printf("accept failed with error code : %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    printf("Connection accepted\n");

    // Receive data from the client
    recv(new_socket, buffer, 1024, 0);
    printf("Message from client: %s\n", buffer);

    // Send a response to the client
    send(new_socket, hello, strlen(hello), 0);
    printf("Hello message sent\n");

    // Clean up and close sockets
    closesocket(new_socket);
    closesocket(server_fd);
    WSACleanup();

    return 0;
}

// gcc TCP_server.c -o TCP_server -lws2_32
// .\TCP_server