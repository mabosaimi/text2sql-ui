# Text To SQL

Enter a natural-language question and retrieve the database table most likely needed to answer it.

The project uses [`mabosaimi/bge-m3-text2tables`](https://huggingface.co/mabosaimi/bge-m3-text2tables), a fine-tuned [`BAAI/bge-m3`](https://huggingface.co/BAAI/bge-m3) model, to match questions with relevant database tables.

- [Web demo](https://text2sql-ui.vercel.app/)
- [Model page](https://huggingface.co/mabosaimi/bge-m3-text2tables)s