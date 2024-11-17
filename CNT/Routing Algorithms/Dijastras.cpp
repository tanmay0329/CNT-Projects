#include <iostream>
#include <vector>
#include <climits>
#include <queue>

using namespace std;

typedef pair<int, int> pii; // Pair for (distance, vertex)

class Graph {
public:
    int V; // Number of vertices
    vector<vector<pii>> adj; // Adjacency list (pairs of (weight, node))

    Graph(int V) {
        this->V = V;
        adj.resize(V);
    }

    // Add edge to the graph (undirected)
    void addEdge(int u, int v, int weight) {
        adj[u].push_back({weight, v});
        adj[v].push_back({weight, u});
    }

    // Dijkstra's Algorithm
    vector<int> dijkstra(int src) {
        vector<int> dist(V, INT_MAX); // Distance from src to each vertex
        dist[src] = 0;

        priority_queue<pii, vector<pii>, greater<pii>> pq;
        pq.push({0, src});

        while (!pq.empty()) {
            int u = pq.top().second;
            int d = pq.top().first;
            pq.pop();

            if (d > dist[u]) continue;

            for (auto& edge : adj[u]) {
                int weight = edge.first;
                int v = edge.second;
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.push({dist[v], v});
                }
            }
        }
        return dist;
    }
};

int main() {
    Graph g(6); // Create a graph with 6 vertices

    g.addEdge(0, 1, 5);
    g.addEdge(0, 2, 10);
    g.addEdge(1, 3, 3);
    g.addEdge(1, 2, 2);
    g.addEdge(2, 4, 1);
    g.addEdge(3, 5, 7);
    g.addEdge(4, 5, 2);

    int src = 0; // Starting point
    vector<int> dist = g.dijkstra(src);

    cout << "Shortest distances from node " << src << ":\n";
    for (int i = 0; i < dist.size(); ++i) {
        cout << "To " << i << " = " << dist[i] << endl;
    }

    return 0;
}
