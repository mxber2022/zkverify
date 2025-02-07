// use risc0_zkvm::guest::env;
// use sha2::{Digest, Sha256};


// fn main() {
//     // read the input
//     let input: String = env::read();

//     let mut hasher = Sha256::new();
//     hasher.update(input.as_bytes()); // Update the hasher with the input bytes
//     let result = hasher.finalize(); // Get the hash digest
//     let output = format!("{:x}", result); // Convert the hash digest to a hexadecimal string
    
//     // write public output to the journal
//     env::commit(&output);
// }


// Guest Code (zkVM program)

use risc0_zkvm::guest::env;
use risc0_zkvm::sha::{Impl, Sha256};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
struct Input {
    seed: Vec<u8>,   // Private seed (never revealed)
    n: u64,          // Public upper bound (e.g., 25)
}

fn main() {
    // Read private inputs
    let input: Input = env::read();

    // Generate SHA-256 hash of seed (zk-SNARK friendly)
    let hash = Impl::hash_bytes(&input.seed);
    let hash_bytes = hash.as_bytes();

    // Convert first 8 bytes of hash to u64
    let mut bytes = [0u8; 8];
    bytes.copy_from_slice(&hash_bytes[..8]);
    let hash_u64 = u64::from_le_bytes(bytes);

    // Compute random number in [0, n] using modulo
    let random_num = hash_u64 % (input.n + 1);

    // Commit public outputs (n + random number) to journal
    env::commit(&(input.n, random_num));
}