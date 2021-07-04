import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async getUserListByName(name: string) {
        const userAlias = 'user';

        const qb = this.createQueryBuilder(userAlias)
            .where(`${userAlias}.name like :name`)
            .setParameters({
                name: `%${name}%`
            })
            .orderBy(`${userAlias}.num`, 'DESC')
            .limit(5);
        
        return await qb.getMany();
    }

}
