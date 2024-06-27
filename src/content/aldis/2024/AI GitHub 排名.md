---
author: Alids
publishDate: 2024-06-25
title: GitHub AI 项目排名
excerpt: GitHub上面AI方面的项目很多有，为AI相关项目进行打分并排名，可以进行很好的参考，帮助学习AI知识。
image: ~/assets/images/aldis/2024/ai.png
category: AI
tags:
  - Rank
  - Python
---

## 排名实现方式

- 使用Github graphql查询语句，查询topic下start数前100名的项目
- AI 相关topic包括："ai", "artificial-intelligence", "deep-learning", "machine-learning", "neural-network", "nlp", "llm", "gpt"
- 将这些topic的前100项目汇聚，并跟进项目去重
- 计算得分并排序，得分=(start + watch*2 + fork*4)
- 排序后得到前100名

## AI Top 100

| Ranking | Project Name | Score | Stars | Watchers | Forks | Language | Open Issues | Description | Last Commit |
| ------- | ------------ | ----- | ----- | ----- | ----- | -------- | ----------- | ----------- | ----------- |
| 1 | [tensorflow](https://github.com/tensorflow/tensorflow) | 347052 | 183754 | 7628 | 74021 | C++ | 1939 | An Open Source Machine Learning Framework for Everyone | 2024-06-25T11:37:42Z |
| 2 | [AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | 253125 | 163359 | 1562 | 43321 | Python | 89 | AutoGPT is the vision of accessible AI for everyone, to use and to build on. Our mission is to provide the tools, so that you can focus on what matters. | 2024-06-25T11:06:14Z |
| 3 | [opencv](https://github.com/opencv/opencv) | 193262 | 76650 | 2658 | 55648 | C++ | 2456 | Open Source Computer Vision Library | 2024-06-25T11:36:08Z |
| 4 | [stable-diffusion-webui](https://github.com/AUTOMATIC1111/stable-diffusion-webui) | 188254 | 134662 | 1048 | 25748 | Python | 2133 | Stable Diffusion web UI | 2024-06-25T07:28:23Z |
| 5 | [transformers](https://github.com/huggingface/transformers) | 181109 | 128099 | 1100 | 25405 | Python | 877 | 🤗 Transformers: State-of-the-art Machine Learning for Pytorch, TensorFlow, and JAX. | 2024-06-25T11:35:52Z |
| 6 | [pytorch](https://github.com/pytorch/pytorch) | 126244 | 79832 | 1728 | 21478 | Python | 13195 | Tensors and Dynamic neural networks in Python with strong GPU acceleration | 2024-06-25T11:50:37Z |
| 7 | [scikit-learn](https://github.com/scikit-learn/scikit-learn) | 113193 | 58723 | 2140 | 25095 | Python | 1567 | scikit-learn: machine learning in Python | 2024-06-25T11:06:14Z |
| 8 | [keras](https://github.com/keras-team/keras) | 103759 | 61217 | 1910 | 19361 | Python | 209 | Deep Learning for humans | 2024-06-25T08:21:48Z |
| 9 | [generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | 102215 | 48375 | 432 | 26488 | Jupyter Notebook | 5 | 18 Lessons, Get Started Building with Generative AI  🔗 https://microsoft.github.io/generative-ai-for-beginners/ | 2024-06-18T05:11:58Z |
| 10 | [ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) | 97641 | 67871 | 1006 | 13879 | HTML | 3 | 12 weeks, 26 lessons, 52 quizzes, classic Machine Learning for all | 2024-06-23T03:22:04Z |
| 11 | [ollama](https://github.com/ollama/ollama) | 87576 | 75378 | 450 | 5649 | Go | 836 | Get up and running with Llama 3, Mistral, Gemma, and other large language models. | 2024-06-25T05:16:08Z |
| 12 | [cs-video-courses](https://github.com/Developer-Y/cs-video-courses) | 87554 | 65774 | 1881 | 9009 | None | 0 | List of Computer Science courses with video lectures. | 2024-06-24T17:18:02Z |
| 13 | [gpt4free](https://github.com/xtekky/gpt4free) | 86174 | 58950 | 459 | 13153 | Python | 41 | The official gpt4free repository \| various collection of powerful language models | 2024-06-24T18:48:25Z |
| 14 | [netdata](https://github.com/netdata/netdata) | 83552 | 69266 | 1360 | 5783 | C | 171 | The open-source observability platform everyone needs! | 2024-06-25T11:35:53Z |
| 15 | [face_recognition](https://github.com/ageitgey/face_recognition) | 82081 | 52265 | 1563 | 13345 | Python | 741 | The world's simplest facial recognition api for Python and the command line | 2024-06-18T08:08:50Z |
| 16 | [d2l-zh](https://github.com/d2l-ai/d2l-zh) | 81527 | 58273 | 1041 | 10586 | Python | 0 | 《动手学深度学习》：面向中文读者、能运行、可讨论。中英文版被70多个国家的500多所大学用于教学。 | 2024-06-22T07:03:11Z |
| 17 | [tesseract](https://github.com/tesseract-ocr/tesseract) | 81098 | 59314 | 1683 | 9209 | C++ | 388 | Tesseract Open Source OCR Engine (main repository) | 2024-06-21T11:09:20Z |
| 18 | [yolov5](https://github.com/ultralytics/yolov5) | 80573 | 48199 | 364 | 15823 | Python | 105 | YOLOv5 🚀 in PyTorch > ONNX > CoreML > TFLite | 2024-06-24T05:00:33Z |
| 19 | [awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh) | 78967 | 51267 | 356 | 13494 | None | 38 | ChatGPT 中文调教指南。各种场景使用指南。学习怎么让它听你的话。 | 2024-06-21T02:59:27Z |
| 20 | [faceswap](https://github.com/deepfakes/faceswap) | 78787 | 49751 | 1524 | 12994 | Python | 18 | Deepfakes Software For All | 2024-06-07T16:39:01Z |
| 21 | [TensorFlow-Examples](https://github.com/aymericdamien/TensorFlow-Examples) | 77368 | 43296 | 2052 | 14984 | Jupyter Notebook | 164 | TensorFlow Tutorial and Examples for Beginners (support TF v1 & v2) | 2024-05-24T19:29:21Z |
| 22 | [caffe](https://github.com/BVLC/caffe) | 75579 | 33937 | 2098 | 18723 | C++ | 899 | Caffe: a fast open framework for deep learning. | 2024-02-21T10:54:14Z |
| 23 | [awesome-scalability](https://github.com/binhnguyennus/awesome-scalability) | 71885 | 56493 | 1863 | 5833 | None | 0 | The Patterns of Scalable, Reliable, and Performant Large-Scale Systems | 2024-06-17T07:01:39Z |
| 24 | [Real-Time-Voice-Cloning](https://github.com/CorentinJ/Real-Time-Voice-Cloning) | 70508 | 51394 | 936 | 8621 | Python | 185 | Clone a voice in 5 seconds to generate arbitrary speech in real-time | 2024-05-29T12:04:38Z |
| 25 | [100-Days-Of-ML-Code](https://github.com/Avik-Jain/100-Days-Of-ML-Code) | 69431 | 43813 | 2440 | 10369 | None | 0 | 100 Days of ML Coding | 2023-12-29T07:57:53Z |
| 26 | [DeepFaceLab](https://github.com/iperov/DeepFaceLab) | 69104 | 46146 | 1131 | 10348 | Python | 540 | DeepFaceLab is the leading software for creating deepfakes. | 2023-10-24T10:56:48Z |
| 27 | [gpt-engineer](https://github.com/gpt-engineer-org/gpt-engineer) | 65505 | 51185 | 507 | 6653 | Python | 6 | Specify what you want it to build, the AI asks for clarification, and then builds it. | 2024-06-23T16:19:46Z |
| 28 | [ailearning](https://github.com/apachecn/ailearning) | 64609 | 38531 | 1684 | 11355 | Python | 2 | AiLearning：数据分析+机器学习实战+线性代数+PyTorch+NLTK+TF2 | 2024-03-04T02:15:13Z |
| 29 | [airflow](https://github.com/apache/airflow) | 64163 | 35159 | 758 | 13744 | Python | 800 | Apache Airflow - A platform to programmatically author, schedule, and monitor workflows | 2024-06-25T11:25:26Z |
| 30 | [ChatGPT](https://github.com/lencx/ChatGPT) | 63934 | 51514 | 430 | 5780 | Rust | 668 | 🔮 ChatGPT Desktop Application (Mac, Windows and Linux) | 2024-06-19T11:50:44Z |
| 31 | [annotated_deep_learning_paper_implementations](https://github.com/labmlai/annotated_deep_learning_paper_implementations) | 62103 | 50737 | 433 | 5250 | Python | 21 | 🧑‍🏫 60 Implementations/tutorials of deep learning papers with side-by-side notes 📝; including transformers (original, xl, switch, feedback, vit, ...), optimizers (adam, adabelief, sophia, ...), gans(cyclegan, stylegan2, ...), 🎮 reinforcement learning (ppo, dqn), capsnet, distillation, ... 🧠 | 2024-06-24T10:47:17Z |
| 32 | [bert](https://github.com/google-research/bert) | 58427 | 37371 | 999 | 9529 | Python | 789 | TensorFlow code and pre-trained models for BERT | 2024-05-02T18:33:48Z |
| 33 | [julia](https://github.com/JuliaLang/julia) | 57609 | 44917 | 929 | 5417 | Julia | 4053 | The Julia Programming Language | 2024-06-25T11:44:10Z |
| 34 | [Deep-Learning-Papers-Reading-Roadmap](https://github.com/floodsung/Deep-Learning-Papers-Reading-Roadmap) | 56488 | 37676 | 2108 | 7298 | Python | 48 | Deep Learning papers reading roadmap for anyone who are eager to learn this amazing tech! | 2022-11-27T13:18:32Z |
| 35 | [Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) | 55469 | 45693 | 513 | 4375 | MDX | 84 | 🐙 Guides, papers, lecture, notebooks and resources for prompt engineering | 2024-06-22T16:18:55Z |
| 36 | [Flowise](https://github.com/FlowiseAI/Flowise) | 55000 | 26892 | 224 | 13830 | TypeScript | 364 | Drag & drop UI to build your customized LLM flow | 2024-06-24T23:23:16Z |
| 37 | [HanLP](https://github.com/hankcs/HanLP) | 54623 | 32871 | 1139 | 9737 | Python | 9 | 中文分词 词性标注 命名实体识别 依存句法分析 成分句法分析 语义依存分析 语义角色标注 指代消解 风格转换 语义相似度 新词发现 关键词短语提取 自动摘要 文本分类聚类 拼音简繁转换 自然语言处理 | 2024-04-16T02:48:39Z |
| 38 | [Coursera-ML-AndrewNg-Notes](https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes) | 53889 | 30875 | 1000 | 10507 | HTML | 52 | 吴恩达老师的机器学习课程个人笔记 | 2024-06-10T00:47:49Z |
| 39 | [handson-ml](https://github.com/ageron/handson-ml) | 53109 | 25107 | 1087 | 12914 | Jupyter Notebook | 126 | ⛔️ DEPRECATED – See https://github.com/ageron/handson-ml3 instead. | 2023-10-03T23:44:04Z |
| 40 | [MetaGPT](https://github.com/geekan/MetaGPT) | 52756 | 41192 | 871 | 4911 | Python | 269 | 🌟 The Multi-Agent Framework: First AI Software Company, Towards Natural Language Programming | 2024-06-22T06:59:01Z |
| 41 | [Made-With-ML](https://github.com/GokuMohandas/Made-With-ML) | 50623 | 36529 | 1223 | 5824 | Jupyter Notebook | 12 | Learn how to design, develop, deploy and iterate on production-grade ML applications. | 2023-12-07T19:38:01Z |
| 42 | [google-research](https://github.com/google-research/google-research) | 50321 | 33297 | 749 | 7763 | Jupyter Notebook | 885 | Google Research | 2024-06-25T04:18:16Z |
| 43 | [lobe-chat](https://github.com/lobehub/lobe-chat) | 50166 | 33960 | 168 | 7935 | TypeScript | 333 | 🤯 Lobe Chat - an open-source, modern-design LLMs/AI chat framework. Supports Multi AI Providers( OpenAI / Claude 3 / Gemini / Ollama / Bedrock / Azure / Mistral / Perplexity ), Multi-Modals (Vision/TTS) and plugin system. One-click FREE deployment of your private ChatGPT chat application. | 2024-06-25T11:34:20Z |
| 44 | [ClickHouse](https://github.com/ClickHouse/ClickHouse) | 49810 | 35258 | 691 | 6585 | C++ | 3243 | ClickHouse® is a real-time analytics DBMS | 2024-06-25T11:50:04Z |
| 45 | [kong](https://github.com/Kong/kong) | 49719 | 38215 | 1004 | 4748 | Lua | 38 | 🦍 The Cloud-Native API Gateway and AI Gateway. | 2024-06-25T11:43:15Z |
| 46 | [AgentGPT](https://github.com/reworkd/AgentGPT) | 49374 | 30478 | 294 | 9154 | TypeScript | 123 | 🤖 Assemble, configure, and deploy autonomous AI Agents in your browser. | 2024-05-21T19:55:04Z |
| 47 | [openpose](https://github.com/CMU-Perceptual-Computing-Lab/openpose) | 47707 | 30283 | 920 | 7792 | C++ | 300 | OpenPose: Real-time multi-person keypoint detection library for body, face, hands, and foot estimation | 2024-05-22T18:20:19Z |
| 48 | [ColossalAI](https://github.com/hpcaitech/ColossalAI) | 47598 | 38258 | 382 | 4288 | Python | 377 | Making large AI models cheaper, faster and more accessible | 2024-06-25T09:17:17Z |
| 49 | [GFPGAN](https://github.com/TencentARC/GFPGAN) | 47598 | 35008 | 501 | 5794 | Python | 336 | GFPGAN aims at developing Practical Algorithms for Real-world Face Restoration. | 2024-04-02T16:39:30Z |
| 50 | [pytorch-tutorial](https://github.com/yunjey/pytorch-tutorial) | 46609 | 29389 | 623 | 7987 | Python | 65 | PyTorch Tutorial for Deep Learning Researchers | 2023-08-15T10:17:50Z |
| 51 | [gold-miner](https://github.com/xitu/gold-miner) | 46096 | 33516 | 1271 | 5019 | None | 5 | 🥇掘金翻译计划，可能是世界最大最好的英译中技术社区，最懂读者和译者的翻译平台： | 2024-04-17T09:44:37Z |
| 52 | [learnopencv](https://github.com/spmallick/learnopencv) | 45446 | 20644 | 883 | 11518 | Jupyter Notebook | 219 | Learn OpenCV  : C++ and Python Examples | 2024-06-24T14:55:57Z |
| 53 | [data-science-ipython-notebooks](https://github.com/donnemartin/data-science-ipython-notebooks) | 45409 | 26671 | 1618 | 7751 | Python | 17 | Data science Python notebooks: Deep learning (TensorFlow, Theano, Caffe, Keras), scikit-learn, Kaggle, big data (Spark, Hadoop MapReduce, HDFS), matplotlib, pandas, NumPy, SciPy, Python essentials, AWS, and various command lines. | 2024-03-20T13:52:34Z |
| 54 | [MockingBird](https://github.com/babysor/MockingBird) | 45234 | 34352 | 308 | 5133 | Python | 465 | 🚀AI拟声: 5秒内克隆您的声音并生成任意语音内容 Clone a voice in 5 seconds to generate arbitrary speech in real-time | 2024-05-22T16:37:07Z |
| 55 | [dify](https://github.com/langgenius/dify) | 45089 | 35093 | 280 | 4718 | TypeScript | 251 | Dify is an open-source LLM app development platform. Dify's intuitive interface combines AI workflow, RAG pipeline, agent capabilities, model management, observability features and more, letting you quickly go from prototype to production. | 2024-06-25T11:49:14Z |
| 56 | [xgboost](https://github.com/dmlc/xgboost) | 44944 | 25750 | 913 | 8684 | C++ | 397 | Scalable, Portable and Distributed Gradient Boosting (GBDT, GBRT or GBM) Library,  for Python, R, Java, Scala, C++ and more. Runs on single machine, Hadoop, Spark, Dask, Flink and DataFlow | 2024-06-25T08:42:29Z |
| 57 | [C-Plus-Plus](https://github.com/TheAlgorithms/C-Plus-Plus) | 44651 | 29563 | 513 | 7031 | C++ | 9 | Collection of various algorithms in mathematics, machine learning, computer science and physics implemented in C++ for educational purposes. | 2024-06-21T04:50:03Z |
| 58 | [Open-Assistant](https://github.com/LAION-AI/Open-Assistant) | 44097 | 36833 | 428 | 3204 | Python | 223 | OpenAssistant is a chat-based assistant that understands tasks, can interact with third-party systems, and retrieve information dynamically to do so. | 2024-05-07T03:03:27Z |
| 59 | [DragGAN](https://github.com/XingangPan/DragGAN) | 44079 | 35311 | 1001 | 3383 | Python | 139 | Official Code for DragGAN (SIGGRAPH 2023) | 2024-05-18T17:51:40Z |
| 60 | [AI-For-Beginners](https://github.com/microsoft/AI-For-Beginners) | 43956 | 32524 | 393 | 5323 | Jupyter Notebook | 22 | 12 Weeks, 24 Lessons, AI for All! | 2024-06-19T02:18:02Z |
| 61 | [ray](https://github.com/ray-project/ray) | 43617 | 31841 | 473 | 5415 | Python | 3311 | Ray is a unified framework for scaling AI and Python applications. Ray consists of a core distributed runtime and a set of AI Libraries for accelerating ML workloads. | 2024-06-25T11:44:05Z |
| 62 | [machine-learning-for-software-engineers](https://github.com/ZuzooVn/machine-learning-for-software-engineers) | 43308 | 27920 | 1501 | 6193 | None | 16 | A complete daily plan for studying to become a machine learning engineer. | 2024-06-11T04:49:29Z |
| 63 | [fairseq](https://github.com/facebookresearch/fairseq) | 43115 | 29689 | 425 | 6288 | Python | 1115 | Facebook AI Research Sequence-to-Sequence Toolkit written in Python. | 2024-06-16T12:18:02Z |
| 64 | [chatgpt-on-wechat](https://github.com/zhayujie/chatgpt-on-wechat) | 42751 | 27587 | 210 | 7372 | Python | 374 | 基于大模型搭建的聊天机器人，同时支持 微信公众号、企业微信应用、飞书、钉钉 等接入，可选择GPT3.5/GPT-4o/GPT4.0/ Claude/文心一言/讯飞星火/通义千问/ Gemini/GLM-4/Claude/Kimi/LinkAI，能处理文本、语音和图片，访问操作系统和互联网，支持基于自有知识库进行定制企业智能客服。 | 2024-06-24T14:04:57Z |
| 65 | [llama_index](https://github.com/run-llama/llama_index) | 42625 | 32985 | 235 | 4585 | Python | 643 | LlamaIndex is a data framework for your LLM applications | 2024-06-25T10:32:22Z |
| 66 | [fastai](https://github.com/fastai/fastai) | 42095 | 25821 | 609 | 7528 | Jupyter Notebook | 199 | The fastai deep learning library | 2024-06-24T15:03:28Z |
| 67 | [DeepSpeed](https://github.com/microsoft/DeepSpeed) | 42080 | 33536 | 339 | 3933 | Python | 981 | DeepSpeed is a deep learning optimization library that makes distributed training and inference easy, efficient, and effective. | 2024-06-25T10:02:42Z |
| 68 | [llm-course](https://github.com/mlabonne/llm-course) | 41116 | 33454 | 349 | 3482 | Jupyter Notebook | 38 | Course to get into Large Language Models (LLMs) with roadmaps and Colab notebooks. | 2024-06-11T14:28:33Z |
| 69 | [quivr](https://github.com/QuivrHQ/quivr) | 41107 | 33923 | 270 | 3322 | Python | 74 | Open-source RAG Framework for building GenAI Second Brains 🧠  Build productivity assistant (RAG) ⚡️🤖 Chat with your docs (PDF, CSV, ...)  & apps using Langchain, GPT 3.5 / 4 turbo, Private, Anthropic, VertexAI, Ollama, LLMs, Groq  that you can share with users !  Efficient retrieval augmented generation framework | 2024-06-25T11:36:02Z |
| 70 | [Langchain-Chatchat](https://github.com/chatchat-space/Langchain-Chatchat) | 40082 | 29258 | 272 | 5140 | TypeScript | 90 | Langchain-Chatchat（原Langchain-ChatGLM）基于 Langchain 与 ChatGLM 等语言模型的本地知识库问答 \| Langchain-Chatchat (formerly langchain-ChatGLM), local knowledge based LLM (like ChatGLM) QA app with langchain  | 2024-06-25T07:53:29Z |
| 71 | [GitHubDaily](https://github.com/GitHubDaily/GitHubDaily) | 39814 | 30592 | 1203 | 3408 | None | 252 | 坚持分享 GitHub 上高质量、有趣实用的开源技术教程、开发者工具、编程网站、技术资讯。A list cool, interesting projects of GitHub. | 2024-05-29T08:56:25Z |
| 72 | [TTS](https://github.com/coqui-ai/TTS) | 39614 | 31550 | 270 | 3762 | Python | 89 | 🐸💬 - a deep learning toolkit for Text-to-Speech, battle-tested in research and production | 2024-06-15T18:46:11Z |
| 73 | [streamlit](https://github.com/streamlit/streamlit) | 39400 | 33006 | 317 | 2880 | Python | 846 | Streamlit — A faster way to build and share data apps. | 2024-06-25T06:44:08Z |
| 74 | [tesseract.js](https://github.com/naptha/tesseract.js) | 39318 | 34052 | 481 | 2152 | JavaScript | 28 | Pure Javascript OCR for more than 100 Languages 📖🎉🖥 | 2024-06-23T07:41:40Z |
| 75 | [spaCy](https://github.com/explosion/spaCy) | 38896 | 29144 | 557 | 4319 | Python | 99 | 💫 Industrial-strength Natural Language Processing (NLP) in Python | 2024-06-21T12:32:04Z |
| 76 | [awesome-datascience](https://github.com/academic/awesome-datascience) | 38486 | 24100 | 1411 | 5782 | None | 0 | :memo: An awesome Data Science repository to learn and apply for real world problems. | 2024-06-02T17:45:40Z |
| 77 | [roop](https://github.com/s0md3v/roop) | 38458 | 25558 | 241 | 6209 | Python | 0 | one-click face swap | 2024-05-25T05:20:43Z |
| 78 | [fastbook](https://github.com/fastai/fastbook) | 38452 | 21064 | 508 | 8186 | Jupyter Notebook | 94 | The fastai book, published as Jupyter Notebooks | 2024-06-21T11:43:00Z |
| 79 | [awesome-deep-learning-papers](https://github.com/terryum/awesome-deep-learning-papers) | 38105 | 25221 | 1965 | 4477 | TeX | 15 | The most cited deep learning papers | 2024-01-18T13:29:44Z |
| 80 | [photoprism](https://github.com/photoprism/photoprism) | 37810 | 33468 | 334 | 1837 | Go | 419 | AI-Powered Photos App for the Decentralized Web 🌈💎✨ | 2024-06-25T08:15:11Z |
| 81 | [stanford_alpaca](https://github.com/tatsu-lab/stanford_alpaca) | 37778 | 29068 | 342 | 4013 | Python | 170 | Code and documentation to train Stanford's Alpaca models, and generate the data. | 2024-03-12T15:41:13Z |
| 82 | [awesome-deep-learning](https://github.com/ChristosChristofidis/awesome-deep-learning) | 37597 | 23211 | 1211 | 5982 | None | 5 | A curated list of awesome Deep Learning tutorials, projects and communities. | 2024-04-30T04:56:36Z |
| 83 | [deep-learning-for-image-processing](https://github.com/WZMIAOMIAO/deep-learning-for-image-processing) | 37435 | 21519 | 157 | 7801 | Python | 68 | deep learning for image processing including classification and object-detection etc. | 2024-06-17T03:06:05Z |
| 84 | [mediapipe](https://github.com/google-ai-edge/mediapipe) | 37072 | 26034 | 494 | 5025 | C++ | 304 | Cross-platform, customizable ML solutions for live and streaming media. | 2024-06-24T18:06:11Z |
| 85 | [autogen](https://github.com/microsoft/autogen) | 36561 | 27769 | 362 | 4034 | Jupyter Notebook | 515 | A programming framework for agentic AI. Discord: https://aka.ms/autogen-dc. Roadmap: https://aka.ms/autogen-roadmap | 2024-06-25T05:16:10Z |
| 86 | [ultralytics](https://github.com/ultralytics/ultralytics) | 35781 | 25391 | 152 | 5043 | Python | 716 | NEW - YOLOv8 🚀 in PyTorch > ONNX > OpenVINO > CoreML > TFLite | 2024-06-25T11:35:55Z |
| 87 | [applied-ml](https://github.com/eugeneyan/applied-ml) | 35582 | 26538 | 931 | 3591 | None | 2 | 📚 Papers & tech blogs by companies sharing their work on data science & machine learning in production. | 2024-05-02T14:44:23Z |
| 88 | [AI-Expert-Roadmap](https://github.com/AMAI-GmbH/AI-Expert-Roadmap) | 35473 | 28677 | 962 | 2436 | JavaScript | 17 | Roadmap to becoming an Artificial Intelligence Expert in 2022 | 2023-12-31T02:20:16Z |
| 89 | [pytorch-CycleGAN-and-pix2pix](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix) | 35427 | 22325 | 350 | 6201 | Python | 530 | Image-to-Image Translation in PyTorch | 2024-05-14T21:56:57Z |
| 90 | [open-webui](https://github.com/open-webui/open-webui) | 35424 | 28914 | 153 | 3102 | Svelte | 119 | User-friendly WebUI for LLMs (Formerly Ollama WebUI) | 2024-06-25T09:28:03Z |
| 91 | [gradio](https://github.com/gradio-app/gradio) | 35409 | 30539 | 165 | 2270 | Python | 490 | Build and share delightful machine learning apps, all in Python. 🌟 Star to support our work! | 2024-06-25T11:18:00Z |
| 92 | [labelImg](https://github.com/HumanSignal/labelImg) | 35330 | 22094 | 401 | 6217 | Python | 403 | LabelImg is now part of the Label Studio community. The popular image annotation tool created by Tzutalin is no longer actively being developed, but you can check out Label Studio, the open source data labeling tool for images, text, hypertext, audio, video and time-series data. | 2024-06-07T20:24:32Z |
| 93 | [gpt-pilot](https://github.com/Pythagora-io/gpt-pilot) | 35323 | 29001 | 268 | 2893 | Python | 206 | The first real AI developer | 2024-06-21T22:07:52Z |
| 94 | [OpenDevin](https://github.com/OpenDevin/OpenDevin) | 34898 | 27956 | 286 | 3185 | Python | 146 | 🐚 OpenDevin: Code Less, Make More | 2024-06-25T11:33:29Z |
| 95 | [Mr.-Ranedeer-AI-Tutor](https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor) | 34868 | 27788 | 339 | 3201 | None | 11 | A GPT-4 AI Tutor Prompt for customizable personalized learning experiences. | 2024-03-25T13:06:55Z |
| 96 | [ML-From-Scratch](https://github.com/eriklindernoren/ML-From-Scratch) | 34467 | 23507 | 938 | 4542 | Python | 33 | Machine Learning From Scratch. Bare bones NumPy implementations of machine learning models and algorithms with a focus on accessibility. Aims to cover everything from linear regression to deep learning. | 2023-10-15T06:05:06Z |
| 97 | [pytorch-lightning](https://github.com/Lightning-AI/pytorch-lightning) | 34458 | 27392 | 247 | 3286 | Python | 766 | Pretrain, finetune and deploy AI models on multiple GPUs, TPUs with zero code changes. | 2024-06-25T08:47:39Z |
| 98 | [so-vits-svc](https://github.com/svc-develop-team/so-vits-svc) | 34247 | 24577 | 175 | 4660 | Python | 21 | SoftVC VITS Singing Voice Conversion | 2023-11-11T13:11:31Z |
| 99 | [Paddle](https://github.com/PaddlePaddle/Paddle) | 34124 | 21762 | 719 | 5462 | C++ | 970 | PArallel Distributed Deep LEarning: Machine Learning Framework from Industrial Practice （『飞桨』核心框架，深度学习&机器学习高性能单机、分布式训练和跨平台部署） | 2024-06-25T11:48:23Z |
| 100 | [pumpkin-book](https://github.com/datawhalechina/pumpkin-book) | 34064 | 23402 | 624 | 4707 | None | 0 | 《机器学习》（西瓜书）公式详解 | 2024-06-07T17:41:20Z |

