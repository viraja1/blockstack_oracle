import { Client, Provider, ProviderRegistry, Result } from "@blockstack/clarity";
import { assert } from "chai";

describe("blockstack oracle test suite", () => {
  let oracleClient: Client;
  let provider: Provider;
  const contract_owner = "ST35QB1XF7211FWZXSVDFE7WT38S2QYCS1XFN0QD0";

  before(async () => {
    provider = await ProviderRegistry.createProvider();
    oracleClient = new Client(contract_owner+ ".oracle", "oracle", provider);
  });

  it("should have a valid syntax", async () => {
    await oracleClient.checkContract();
  });

  describe("deploying an instance of the contract", () => {
    before(async () => {
      await oracleClient.deployContract();
    });

    it("test get-bitcoin-price at start", async () => {
      const query = oracleClient.createQuery({ method: { name: "get-bitcoin-price", args: []}});
      const receipt = await oracleClient.submitQuery(query);
      assert.equal(receipt.result, "(ok 0)");
    });

    it("test get-oracle-address at start", async () => {
      const query = oracleClient.createQuery({ method: { name: "get-oracle-address", args: []}});
      const receipt = await oracleClient.submitQuery(query);
      assert.equal(receipt.result, "(ok " + contract_owner + ")");
    });


    it("test oracle-address and bitcoin-price update", async () => {
      // update oracle address
      const tx = oracleClient.createTransaction( {method: {name: "update-oracle-address", args: [`${contract_owner}`]}});
      await tx.sign(`${contract_owner}`);
      await oracleClient.submitTransaction(tx);

      // update bitcoin price
      const price = 9500;
      const tx2 = oracleClient.createTransaction( {method: {name: "update-bitcoin-price", args: [`${price}`]}});
      await tx2.sign(`${contract_owner}`);
      await oracleClient.submitTransaction(tx2);

      // check oracle address
      const query = oracleClient.createQuery({ method: { name: "get-oracle-address", args: []}});
      const receipt = await oracleClient.submitQuery(query);
      assert.equal(receipt.result, "(ok " + contract_owner + ")");

      // check bitcoin price
      const query2 = oracleClient.createQuery({ method: { name: "get-bitcoin-price", args: []}});
      const receipt2 = await oracleClient.submitQuery(query2);
      assert.equal(receipt2.result, `(ok 9500)`);


    });
  });

  after(async () => {
    await provider.close();
  });
});
