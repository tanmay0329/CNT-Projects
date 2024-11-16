#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#define PORT 8000

int main() {
    WSADATA wsa;
    SOCKET server_fd;
    struct sockaddr_in server_addr, client_addr;
    int client_len = sizeof(client_addr);
    char buffer[1024] = {0};
    char *message = "Hello from server";

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2,2), &wsa) != 0) {
        printf("Failed. Error Code : %d\n", WSAGetLastError());
        return 1;
    }

    // Create socket
    if ((server_fd = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
        printf("Could not create socket : %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    // Prepare the sockaddr_in structure
    server_addr.sin_family = AF_INET;
    server_addr.sin_addr.s_addr = INADDR_ANY;
    server_addr.sin_port = htons(PORT);

    // Bind the socket
    if (bind(server_fd, (struct sockaddr *)&server_addr, sizeof(server_addr)) == SOCKET_ERROR) {
        printf("Bind failed with error code : %d\n", WSAGetLastError());
        closesocket(server_fd);
        WSACleanup();
        return 1;
    }

    printf("Waiting for data...\n");

    // Receive data from the client
    recvfrom(server_fd, buffer, 1024, 0, (struct sockaddr *)&client_addr, &client_len);
    printf("Message from client: %s\n", buffer);

    // Send a response to the client
    sendto(server_fd, message, strlen(message), 0, (struct sockaddr *)&client_addr, client_len);
    printf("Hello message sent\n");

    // Clean up and close socket
    closesocket(server_fd);
    WSACleanup();

    return 0;
}
