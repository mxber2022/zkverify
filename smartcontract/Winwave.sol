// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface IZkVerifyAttestation {

    function submitAttestation(
        uint256 _attestationId,
        bytes32 _proofsAttestation) external;

    function submitAttestationBatch(
        uint256[] calldata _attestationIds,
        bytes32[] calldata _proofsAttestation) external;

    function verifyProofAttestation(
        uint256 _attestationId,
        bytes32 _leaf,
        bytes32[] calldata _merklePath,
        uint256 _leafCount,
        uint256 _index) external returns (bool);
}

contract Winwave {
    
    bytes32 public constant PROVING_SYSTEM_ID = keccak256(abi.encodePacked("risc0"));

    mapping(address => bool) public hasSubmittedValidProof;  // A mapping for recording the addresses which have submitted valid proofs

    event SuccessfulProofSubmission(address indexed from);

    address public zkVerify; // zkVerify contract
    bytes32 public vkey; // vkey for our circuit
    bytes32 public vhash; // version hash

    constructor(address _zkVerify, bytes32 _vkey, bytes32 _vhash) {
        zkVerify = _zkVerify;
        vkey = _vkey;
        vhash = _vhash;
    }

    function checkHash(
        bytes memory _hash, //public input
        uint256 _attestationId,
        bytes32[] calldata _merklePath,
        uint256 _leafCount,
        uint256 _index
    ) public {

        bytes32 leaf = keccak256(abi.encodePacked(PROVING_SYSTEM_ID, vkey, vhash, keccak256(abi.encodePacked(_hash))));

        require(IZkVerifyAttestation(zkVerify).verifyProofAttestation(
            _attestationId,
            leaf,
            _merklePath,
            _leafCount,
            _index
        ), "Invalid proof");
    }
}