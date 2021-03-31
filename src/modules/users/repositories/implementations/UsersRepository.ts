import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    return await this.repository.findOneOrFail({
      where: { id: user_id },
      relations: ["games"],
    });
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    return this.repository.query("SELECT * FROM USERS ORDER BY first_name");
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    // Complete usando raw query
    const userFullName = await this.repository.query(
      "SELECT email, first_name, last_name FROM USERS WHERE first_name = '" +
        first_name.charAt(0).toUpperCase() +
        first_name.slice(1).toLocaleLowerCase() +
        "' AND last_name = '" +
        last_name.charAt(0).toUpperCase() +
        last_name.slice(1).toLocaleLowerCase() +
        "'"
    );
    return userFullName;
  }
}
