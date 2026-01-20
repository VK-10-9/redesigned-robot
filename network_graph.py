"""
Network graph analysis for AFIF.
Builds relationship graphs between identities, enrollment centers,
devices, and IPs to detect coordinated fraud networks.
"""

from collections import defaultdict
from typing import Dict, List, Set


class NetworkGraph:
    """Simple graph representation for fraud network detection."""

    def __init__(self):
        self.edges = defaultdict(set)  # node -> set of connected nodes
        self.node_type = {}  # node -> type (identity, center, device, ip)

    def add_node(self, node_id: str, node_type: str):
        """Add a node to the graph."""
        self.node_type[node_id] = node_type

    def add_edge(self, node_a: str, node_b: str):
        """Add undirected edge between two nodes."""
        self.edges[node_a].add(node_b)
        self.edges[node_b].add(node_a)

    def find_cliques(self, min_size: int = 3) -> List[Set[str]]:
        """Find cliques (tightly connected groups) in graph.

        Simple O(n^3) approach; sufficient for moderate-size graphs.
        """
        cliques = []
        nodes = list(self.edges.keys())

        for i, node_a in enumerate(nodes):
            for node_b in nodes[i + 1 :]:
                if node_b not in self.edges[node_a]:
                    continue
                # node_a and node_b are connected; find common neighbors
                common = self.edges[node_a] & self.edges[node_b]
                if len(common) >= min_size - 2:
                    clique = {node_a, node_b} | common
                    if clique not in cliques and len(clique) >= min_size:
                        cliques.append(clique)

        return cliques


def _add_record_nodes(graph: NetworkGraph, record: Dict[str, str]) -> tuple:
    """Extract and add nodes from a record. Returns (aadhaar, center, device, ip)."""
    aadhaar = record.get("aadhaar", "").strip()
    center_id = record.get("center_id", "").strip()
    device_id = record.get("device_id", "").strip()
    ip_address = record.get("ip_address", "").strip()

    if aadhaar:
        graph.add_node(aadhaar, "identity")
    if center_id:
        graph.add_node(f"center:{center_id}", "center")
    if device_id:
        graph.add_node(f"device:{device_id}", "device")
    if ip_address:
        graph.add_node(f"ip:{ip_address}", "ip")

    return aadhaar, center_id, device_id, ip_address


def _add_record_edges(
    graph: NetworkGraph, aadhaar: str, center_id: str, device_id: str, ip: str
):
    """Add edges between record nodes."""
    if aadhaar and center_id:
        graph.add_edge(aadhaar, f"center:{center_id}")
    if aadhaar and device_id:
        graph.add_edge(aadhaar, f"device:{device_id}")
    if aadhaar and ip:
        graph.add_edge(aadhaar, f"ip:{ip}")
    if center_id and device_id:
        graph.add_edge(f"center:{center_id}", f"device:{device_id}")
    if device_id and ip:
        graph.add_edge(f"device:{device_id}", f"ip:{ip}")


def build_network_from_records(records: List[Dict[str, str]]) -> NetworkGraph:
    """Build a network graph from enrollment records.

    Nodes: identities, centers, devices, IPs
    Edges: connections (identity enrolled at center via device from IP)
    """
    graph = NetworkGraph()

    for record in records:
        aadhaar, center_id, device_id, ip_address = _add_record_nodes(graph, record)
        _add_record_edges(graph, aadhaar, center_id, device_id, ip_address)

    return graph


def detect_fraud_networks(records: List[Dict[str, str]]) -> List[Dict]:
    """Detect coordinated fraud networks in enrollment records."""
    graph = build_network_from_records(records)
    cliques = graph.find_cliques(min_size=3)

    networks = []
    for clique in cliques:
        identities = [
            n
            for n in clique
            if n not in graph.node_type or graph.node_type.get(n) == "identity"
        ]
        centers = [n for n in clique if isinstance(n, str) and n.startswith("center:")]
        devices = [n for n in clique if isinstance(n, str) and n.startswith("device:")]
        ips = [n for n in clique if isinstance(n, str) and n.startswith("ip:")]

        networks.append(
            {
                "clique_size": len(clique),
                "identities_count": len(identities),
                "centers_count": len(centers),
                "devices_count": len(devices),
                "ips_count": len(ips),
                "risk_score": min(
                    1.0, len(clique) / 10.0
                ),  # Larger cliques = higher risk
            }
        )

    return sorted(networks, key=lambda x: x["risk_score"], reverse=True)
