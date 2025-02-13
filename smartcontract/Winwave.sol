// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {ERC721} from "@openzeppelin/contracts@5.2.0/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts@5.2.0/access/Ownable.sol";

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

contract Winwave is ERC721, Ownable {
    
    bytes32 public constant PROVING_SYSTEM_ID = keccak256(abi.encodePacked("risc0"));

    mapping(address => bool) public hasSubmittedValidProof;  // A mapping for recording the addresses which have submitted valid proofs

    event SuccessfulProofSubmission(address indexed from);

    address public zkVerify; // zkVerify contract
    bytes32 public vkey; // vkey for our circuit
    bytes32 public vhash; // version hash

    uint256 private _nextTokenId;
    
    constructor(address _zkVerify, bytes32 _vkey, bytes32 _vhash, address initialOwner)ERC721("winwave", "win") Ownable(initialOwner) {
        zkVerify = _zkVerify;
        vkey = _vkey;
        vhash = _vhash;
    }

    function checkHash(
        bytes memory _hash,
        uint256 _attestationId,
        bytes32[] calldata _merklePath,
        uint256 _leafCount,
        uint256 _index,
        address _mint
    ) public {

        bytes32 leaf = keccak256(abi.encodePacked(PROVING_SYSTEM_ID, vkey, vhash, keccak256(abi.encodePacked(_hash))));

        require(IZkVerifyAttestation(zkVerify).verifyProofAttestation(
            _attestationId,
            leaf,
            _merklePath,
            _leafCount,
            _index
        ), "Invalid proof");

        safeMint(_mint);
    }

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }
}