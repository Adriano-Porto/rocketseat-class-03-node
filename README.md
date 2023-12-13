# App

GymPass Style App

# RFs (Requisitos Funcionais)

- [x] Deve ser possível o usuário se cadastrar
- [x] Deve ser possível o usuário se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obeer o número de checkings realizados
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [ ] Deve ser possível o usuário buscar academias próximas
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [ ] Deve ser possível Validar o check-in do usuário
- [x] Deve ser possível cadastrar uma academia

# RNs (Regras de Negócio)

- [x]   O usuário não deve poder se cadastrar com o email duplicado
- [x]   O usuário não pode fazer 2 check-ins no mesmo dia
- [x]   O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ]   O check-in só pode ser validado até 20 minutos após criado
- O check-in só pode ser validado por administradores
- A academia só pode ser cadastrada por administradores

# RNFs (Requisitos Não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persisitido em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens
- [ ] O usuário deve ser identificado por um JWT