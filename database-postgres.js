import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostrgres {
  #videos = new Map();

  async list(search = "") {
    const videos = await sql`select * from videos where title ilike ${
      "%" + search + "%"
    }`;

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;

    await sql`insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, video) {
    const { title, description, duration } = video;
    await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} where id = ${id}`;
  }
  async delete(id) {
    await sql`delete from videos where id = ${id}`;
  }
}
