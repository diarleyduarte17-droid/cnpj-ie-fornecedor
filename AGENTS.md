# Briefing para IA

Crie conectores separados para dados públicos de CNPJ e consulta oficial de IE. Exponha a fonte e horário de cada campo no retorno.

- Valide CNPJ localmente antes de qualquer chamada.
- Não conclua "não contribuinte" apenas porque uma API falhou ou não retornou IE.
- A fonte oficial pode requerer certificado, credenciamento e consulta por UF; mantenha-a como adaptador opcional.
- Respeite rate limits, termos de uso e LGPD. Não publique dados de fornecedores reais em fixtures.
