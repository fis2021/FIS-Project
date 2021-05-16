import { expect } from "chai";
import app from "../src/server";
import { agent as request } from "supertest";

const id = "607c36ea053a6512e81acf67";

describe("Reviews test", async () => {
    it("should GET /api/reviews/:id", async function () {
        const res = await request(app).get(`/api/reviews/${id}`);
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.be.an("array");
    });

    it("should POST /api/reviews", async function () {
        const res = await request(app).post(`/api/reviews`).send({
            description: "Unit test review",
            date: "nu conteaza",
            bookId: "607c36ea053a6512e81acf67",
        });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
    });
});
