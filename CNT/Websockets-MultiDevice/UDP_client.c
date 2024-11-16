#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <winsock2.h>

#define PORT 8000

int main() {
    WSADATA wsa;
    SOCKET sock;
    struct sockaddr_in serv_addr;
    char *message = "Hello from client";
    char buffer[1024] = {0};
    int serv_len = sizeof(serv_addr);

    // Initialize Winsock
    if (WSAStartup(MAKEWORD(2,2), &wsa) != 0) {
        printf("Failed. Error Code : %d\n", WSAGetLastError());
        return 1;
    }

    // Create socket
    if ((sock = socket(AF_INET, SOCK_DGRAM, 0)) == INVALID_SOCKET) {
        printf("Could not create socket : %d\n", WSAGetLastError());
        WSACleanup();
        return 1;
    }

    // Prepare the sockaddr_in structure
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);
    serv_addr.sin_addr.s_addr = inet_addr("192.168.91.167");  // Replace with the server's IP address

    // Send data to the server
    sendto(sock, message, strlen(message), 0, (struct sockaddr *)&serv_addr, serv_len);
    printf("Hello message sent\n");

    // Receive a reply from the server
    recvfrom(sock, buffer, 1024, 0, (struct sockaddr *)&serv_addr, &serv_len);
    printf("Message from server: %s\n", buffer);

    // Clean up and close socket
    closesocket(sock);
    WSACleanup();

    return 0;
}
