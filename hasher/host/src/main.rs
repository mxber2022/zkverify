// // These constants represent the RISC-V ELF and the image ID generated by risc0-build.
// // The ELF is used for proving and the ID is used for verification.
// use methods::{
//     HASHER_GUEST_ELF, HASHER_GUEST_ID
// };
// use risc0_zkvm::{default_prover, ExecutorEnv};

// fn main() {
//     // Initialize tracing. In order to view logs, run `RUST_LOG=info cargo run`
//     tracing_subscriber::fmt()
//         .with_env_filter(tracing_subscriber::filter::EnvFilter::from_default_env())
//         .init();

//     // An executor environment describes the configurations for the zkVM
//     // including program inputs.
//     // A default ExecutorEnv can be created like so:
//     // `let env = ExecutorEnv::builder().build().unwrap();`
//     // However, this `env` does not have any inputs.
//     //
//     // To add guest input to the executor environment, use
//     // ExecutorEnvBuilder::write().
//     // To access this method, you'll need to use ExecutorEnv::builder(), which
//     // creates an ExecutorEnvBuilder. When you're done adding input, call
//     // ExecutorEnvBuilder::build().

//     // For example:
//     let input: String = std::env::args().nth(1).unwrap();
//     println!("Input argument is: {}", input);
    
//     let env = ExecutorEnv::builder()
//         .write(&input)
//         .unwrap()
//         .build()
//         .unwrap();

//     // Obtain the default prover.
//     let prover = default_prover();

//     // Proof information by proving the specified ELF binary.
//     // This struct contains the receipt along with statistics about execution of the guest
//     let prove_info = prover
//         .prove(env, HASHER_GUEST_ELF)
//         .unwrap();

//     // extract the receipt.
//     let receipt = prove_info.receipt;

//     // TODO: Implement code for retrieving receipt journal here.

//     // For example:
//     let mut bin_receipt = Vec::new();
//     ciborium::into_writer(&receipt, &mut bin_receipt).unwrap();
//     let out = std::fs::File::create("proof.bin").unwrap();
//     ciborium::into_writer(&receipt, out).unwrap();

//     println!(
//         "Serialized bytes array (hex) INNER: {}\n",
//         hex::encode(&bin_receipt)
//     );
//     let receipt_journal_bytes_array = &receipt.journal.bytes.as_slice();
//     println!(
//         "Journal bytes array (hex): {}\n",
//         hex::encode(&receipt_journal_bytes_array)
//     );
//     let image_id_hex = hex::encode(
//         HASHER_GUEST_ID
//             .into_iter()
//             .flat_map(|v| v.to_le_bytes().into_iter())
//             .collect::<Vec<_>>(),
//     );
//     println!("Serialized bytes array (hex) IMAGE_ID: {}\n", image_id_hex);
//     let output: String = receipt.journal.decode().unwrap();
//     println!("Output is: {}", output);

//     // The receipt was verified at the end of proving, but the below code is an
//     // example of how someone else could verify this receipt.
//     receipt
//         .verify(HASHER_GUEST_ID)
//         .unwrap();
// }




//2.
// Host Code (Prover/Verifier)
// These constants represent the RISC-V ELF and the image ID generated by risc0-build.
// The ELF is used for proving and the ID is used for verification.

/*
use methods::{ HASHER_GUEST_ELF, HASHER_GUEST_ID };
use risc0_zkvm::{default_prover, ExecutorEnv};
use serde::Serialize;
use std::fs::File;

#[derive(Serialize)]
struct Input {
    /// Private seed, e.g. 32 bytes of entropy
    seed: Vec<u8>,
    /// Public upper bound
    n: u64,
}

fn main() {
    // Initialize tracing. In order to view logs, run `RUST_LOG=info cargo run -- <seed> <n>`
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::filter::EnvFilter::from_default_env())
        .init();

    // Gather command-line args: 
    // Example usage: `cargo run -- 32 25`
    let seed_arg = std::env::args()
        .nth(1)
        .expect("Missing first arg: seed length in bytes");
    let n_arg = std::env::args()
        .nth(2)
        .expect("Missing second arg: public upper bound");

    // For demonstration, interpret `seed_arg` as the length in bytes of an all-42 seed
    let seed_len = seed_arg
        .parse::<usize>()
        .expect("Failed to parse seed length");
    let n = n_arg.parse::<u64>().expect("Failed to parse upper bound");

    println!("Using seed of length = {} bytes, n = {}", seed_len, n);

    // 1. Prepare the input for the guest
    let seed = vec![42u8; seed_len];
    let input = Input { seed, n };

    // 2. Build an ExecutorEnv with our input
    let mut builder = ExecutorEnv::builder();
// Unwrap or handle error from writing input:
builder.write(&input).unwrap();

// Now builder is `&mut ExecutorEnvBuilder`, so we can call build():
let env = builder.build().unwrap();

    // 3. Obtain the default prover and prove the code using the given ELF
    let prover = default_prover();
    let prove_info = prover
        .prove(env, HASHER_GUEST_ELF)
        .expect("Failed to prove execution");

    // The `prove_info` struct contains a `receipt` plus stats about the guest execution
    let receipt = prove_info.receipt;

    // 4. (Optional) Save the receipt to a file and show hex-encoded output
    let mut bin_receipt = Vec::new();
    ciborium::into_writer(&receipt, &mut bin_receipt).unwrap();
    let out = File::create("proof.bin").unwrap();
    ciborium::into_writer(&receipt, out).unwrap();

    println!(
        "Serialized receipt (hex): {}\n",
        hex::encode(&bin_receipt)
    );

    // 5. Get the receipt's journal bytes
    let receipt_journal_bytes = receipt.journal.bytes.as_slice();
    println!(
        "Journal bytes (hex): {}\n",
        hex::encode(receipt_journal_bytes)
    );

    // If you want to see how the ID is represented in hex, do this:
    let image_id_hex = hex::encode(
        HASHER_GUEST_ID
            .iter()
            .flat_map(|word| word.to_le_bytes())
            .collect::<Vec<_>>(),
    );
    println!("Image ID (hex): {}\n", image_id_hex);

    // 6. Decode the journal data. In your guest code, you might have committed
    //    a tuple: (n, random_number). So let's decode them as (u64, u64).
    let (journal_n, journal_random_num): (u64, u64) = receipt
        .journal
        .decode()
        .expect("Failed to decode (n, random_num) from journal");

    println!("Random number between 0..{}: {}", journal_n, journal_random_num);

    // 7. Verify the receipt cryptographically using the known Image ID.
    //    If the code doesn't match or the proof is invalid, this will fail.
    receipt
        .verify(HASHER_GUEST_ID)
        .expect("Receipt verification failed");
    println!("Receipt verified successfully!");
}

*/

//3. 


use methods::{HASHER_GUEST_ELF, HASHER_GUEST_ID};
use risc0_zkvm::{default_prover, ExecutorEnv};
use serde::Serialize;
use std::fs::File;
use std::io::Write;

#[derive(Serialize)]
struct ProofOutput {
    vk: String,
    publicSignals: String,
    receipt: serde_json::Value,
}

#[derive(Serialize)]
struct Input {
    /// Private seed, e.g. 32 bytes of entropy
    seed: Vec<u8>,
    /// Public upper bound
    n: u64,
}

fn main() {
    // Initialize tracing
    tracing_subscriber::fmt()
        .with_env_filter(tracing_subscriber::filter::EnvFilter::from_default_env())
        .init();

    // Gather command-line args
    let seed_arg = std::env::args()
        .nth(1)
        .expect("Missing first arg: seed length in bytes");
    let n_arg = std::env::args()
        .nth(2)
        .expect("Missing second arg: public upper bound");

    // Interpret seed and n
    let seed_len = seed_arg
        .parse::<usize>()
        .expect("Failed to parse seed length");
    let n = n_arg.parse::<u64>().expect("Failed to parse upper bound");

    println!("Using seed of length = {} bytes, n = {}", seed_len, n);

    // Prepare input
    let seed = vec![42u8; seed_len];
    let input = Input { seed, n };

    // Build ExecutorEnv
    let mut builder = ExecutorEnv::builder();
    builder.write(&input).unwrap();
    let env = builder.build().unwrap();

    // Prove execution
    let prover = default_prover();
    let prove_info = prover
        .prove(env, HASHER_GUEST_ELF)
        .expect("Failed to prove execution");
    let receipt = prove_info.receipt;

    // Get publicSignals (journal bytes)
    let receipt_journal_bytes = receipt.journal.bytes.as_slice();
    let public_signals = hex::encode(receipt_journal_bytes);

    // Get vk (Image ID)
    let vk = hex::encode(
        HASHER_GUEST_ID
            .iter()
            .flat_map(|word| word.to_le_bytes())
            .collect::<Vec<_>>(),
    );

    // Serialize the proof to JSON
    let json_receipt = serde_json::to_value(&receipt).unwrap();
    let proof_output = ProofOutput {
        vk,
        publicSignals: public_signals,
        receipt: json_receipt,
    };

    let json_proof = serde_json::to_string_pretty(&proof_output).unwrap();
    let mut file = File::create("proof.json").unwrap();
    file.write_all(json_proof.as_bytes()).unwrap();
    
    println!("Serialized receipt saved to 'proof.json'");

    // Decode and display public information
    let (journal_n, journal_random_num): (u64, u64) = receipt
        .journal
        .decode()
        .expect("Failed to decode (n, random_num) from journal");

    println!("Random number between 0..{}: {}", journal_n, journal_random_num);

    // Verify receipt cryptographically using Image ID
    receipt
        .verify(HASHER_GUEST_ID)
        .expect("Receipt verification failed");
    println!("Receipt verified successfully!");
}
