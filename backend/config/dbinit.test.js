import sequelize from "./dbinit";

test('Database initilization', async () => {
    const res = await sequelize();
    expect(res).not.toBeNull();
    res.close();
})